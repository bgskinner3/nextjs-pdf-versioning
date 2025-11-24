'use client';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/selection-mode/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/properties/lib/styles/index.css';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { searchPlugin } from '@react-pdf-viewer/search';
import { zoomPlugin } from '@react-pdf-viewer/zoom';

import { cn, ObjectUtils } from '@/utils';
import { BasicIcon } from '../icon';
import { Button } from '../button';
import {
  useToolbarActions,
  useToolbarValues,
  useHighlighterValues,
  useHighlighterActions,
  usePdfValues,
  usePdfActions,
} from '@/hooks';
import { selectionModePlugin } from '@react-pdf-viewer/selection-mode';
import {
  highlightPlugin,
  Trigger,
  MessageIcon,
  SelectionData,
} from '@react-pdf-viewer/highlight';
import {
  PluginOnTextLayerRender,
  LayerRenderStatus,
} from '@react-pdf-viewer/core';
import {
  RenderHighlightContent,
  RenderHighlights,
  RenderHighlightTarget,
  SidebarNotes,
  CustomZoom,
  SearchViewer,
} from './tool-bar-items';
import { LOCAL_STORAGE_KEYS } from '@/constants';
import { Dialog } from '../dialog';
import { useCallback } from 'react';
import {
  RenderHighlightContentProps,
  RenderHighlightTargetProps,
  RenderHighlightsProps,
} from '@react-pdf-viewer/highlight';
import { useState, useEffect } from 'react';
type TEnhancedViewerProps = {
  fileUrl: string;
};
function normalizeSelectionData(selectionData: SelectionData): SelectionData {
  if (
    !selectionData ||
    !selectionData.divTexts ||
    selectionData.divTexts.length === 0
  ) {
    console.warn(
      '[normalizeSelectionData] Empty selectionData, using fallback defaults',
      selectionData,
    );

    return {
      ...selectionData,
      divTexts: [],
      startDivIndex: 0,
      endDivIndex: 0,
      startOffset: 0,
      endOffset: 0,
    };
  }

  console.log(
    '[normalizeSelectionData] Original selectionData:',
    selectionData,
  );

  // 1️⃣ Sort divs by divIndex
  const sortedDivs = [...selectionData.divTexts].sort(
    (a, b) => a.divIndex - b.divIndex,
  );
  console.log(
    '[normalizeSelectionData] Sorted divTexts:',
    sortedDivs.map((d) => d.divIndex),
  );

  // 2️⃣ Remove duplicates
  const uniqueDivs = sortedDivs.filter(
    (div, index, arr) =>
      index === 0 || div.divIndex !== arr[index - 1].divIndex,
  );
  if (uniqueDivs.length !== sortedDivs.length) {
    console.log(
      '[normalizeSelectionData] Removed duplicate divIndices:',
      uniqueDivs.map((d) => d.divIndex),
    );
  }

  // 3️⃣ Clamp indices
  let startDivIndex = Math.min(
    Math.max(selectionData.startDivIndex, 0),
    uniqueDivs.length - 1,
  );
  let endDivIndex = Math.min(
    Math.max(selectionData.endDivIndex, 0),
    uniqueDivs.length - 1,
  );

  // 4️⃣ Ensure chronological order
  if (startDivIndex > endDivIndex) {
    console.log(
      '[normalizeSelectionData] Swapping start/end div indices to ensure chronological order',
    );
    [startDivIndex, endDivIndex] = [endDivIndex, startDivIndex];
  }

  // 5️⃣ Clamp offsets to actual DOM child nodes using normalize()
  const clampOffset = (divIndex: number, offset: number) => {
    const div = uniqueDivs[divIndex];
    if (!div) return 0;

    // Find the div node in the DOM
    const divNode = document.querySelector(
      `[data-div-index="${div.divIndex}"]`,
    ) as HTMLElement | null;

    if (!divNode || divNode.childNodes.length === 0) return 0;

    // Normalize the node to merge text nodes and remove empty nodes
    divNode.normalize();

    // Clamp offset to the number of child nodes
    return Math.min(Math.max(offset, 0), divNode.childNodes.length);
  };

  const startOffset = clampOffset(startDivIndex, selectionData.startOffset);
  const endOffset = clampOffset(endDivIndex, selectionData.endOffset);
  console.log(
    '[normalizeSelectionData] Clamped startOffset/endOffset:',
    startOffset,
    endOffset,
  );

  const normalized = {
    ...selectionData,
    divTexts: uniqueDivs,
    startDivIndex,
    endDivIndex,
    startOffset,
    endOffset,
  };

  console.log('[normalizeSelectionData] Normalized selectionData:', normalized);

  return normalized;
}

export const EnhancedViewer = ({ fileUrl }: TEnhancedViewerProps) => {
  const pdfValues = usePdfValues();
  const pdfActions = usePdfActions();
  const values = useHighlighterValues();

  const highlighterActions = useHighlighterActions();

  const { togglePanel } = useToolbarActions();
  const { activePanels } = useToolbarValues();
  const zoomPluginInstance = zoomPlugin({});
  const searchPluginInstance = searchPlugin({ enableShortcuts: true });
  const selectionModePluginInstance = selectionModePlugin();
  const renderHighlightTarget = useCallback(
    (props: RenderHighlightTargetProps) => {
      // const safeSelectionData = props.selectionData
      //   ? normalizeSelectionData(props.selectionData)
      //   : undefined;
      const safeSelectionData = props.selectionData
        ? normalizeSelectionData(props.selectionData)
        : undefined;
      // normalize the DOM nodes of the selected divs
      safeSelectionData?.divTexts.forEach((div) => {
        const divNode = document.querySelector(
          `[data-div-index="${div.divIndex}"]`,
        ) as HTMLElement | null;
        if (divNode) divNode.normalize();
      });

      return (
        <RenderHighlightTarget
          props={{ ...props, selectionData: safeSelectionData }}
          values={values}
          actions={highlighterActions}
          version={pdfValues.currentVersion!}
        />
      );
    },
    [values, highlighterActions, pdfValues.currentVersion],
  );

  const renderHighlightContent = useCallback(
    (props: RenderHighlightContentProps) => {
      const safeSelectionData = props.selectionData
        ? normalizeSelectionData(props.selectionData)
        : undefined;

      return (
        <RenderHighlightContent
          props={{ ...props, selectionData: safeSelectionData }}
          values={values}
          actions={highlighterActions}
          version={pdfValues.currentVersion!}
        />
      );
    },
    [values, highlighterActions, pdfValues.currentVersion],
  );

  const renderHighlights = useCallback(
    (props: RenderHighlightsProps) => {
      return <RenderHighlights props={props} values={values} />;
    },
    [values],
  );

  // Top-level plugin instance (hooks inside, called at top level)
  const highlightPluginInstance = highlightPlugin({
    trigger: Trigger.None,
    renderHighlightTarget,
    renderHighlightContent,
    // renderHighlights,
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    setInitialTab: (_doc) => Promise.resolve(0),
    sidebarTabs: (defaultTabs) =>
      defaultTabs.concat({
        content: (
          <SidebarNotes
            values={values}
            highlightPluginInstance={highlightPluginInstance}
            actions={highlighterActions}
          />
        ),
        icon: <MessageIcon />,
        title: 'Notes',
      }),
    renderToolbar: (Toolbar) => (
      <div className="shadow-dark-300 flex h-[50px] w-full items-center bg-inherit">
        <Toolbar>
          {(_) => {
            return (
              <div
                className={cn(
                  'grid h-full',
                  'grid-cols-3 pt-1',
                  'container max-w-none 2xl:container',
                )}
              >
                <div className="flex h-full flex-row items-center gap-x-2">
                  <Button
                    className={cn(
                      'group rounded-xl hover:bg-neutral-700',
                      activePanels.has('search') && 'bg-neutral-700',
                    )}
                    variant="none"
                    onClick={() => togglePanel('search')}
                  >
                    <BasicIcon
                      name="magnifyingGlass"
                      className={cn(
                        activePanels.has('search') && 'fill-sky-500',
                        'h-5 w-auto transition-all duration-300 group-hover:fill-sky-500',
                      )}
                    />
                  </Button>
                  <Button
                    className={cn(
                      'group rounded-xl hover:bg-neutral-700',
                      activePanels.has('highlight') && 'bg-neutral-700',
                    )}
                    variant="none"
                    onClick={() => {
                      togglePanel('highlight');
                      highlightPluginInstance.switchTrigger(
                        activePanels.has('highlight')
                          ? Trigger.None
                          : Trigger.TextSelection,
                      );
                    }}
                  >
                    <BasicIcon
                      name="editMarker"
                      className={cn(
                        activePanels.has('highlight') && 'fill-yellow-500',
                        'h-5 w-auto transition-all duration-300 group-hover:fill-yellow-500',
                      )}
                    />
                  </Button>
                  <Button
                    className={cn('group rounded-xl hover:bg-neutral-700')}
                    variant="none"
                  >
                    <BasicIcon
                      name="textBox"
                      className={cn(
                        'h-5 w-auto transition-all duration-300 group-hover:fill-green-500',
                      )}
                    />
                  </Button>
                </div>
                <CustomZoom zoomPluginInstance={zoomPluginInstance} />
                <div
                  className={cn(
                    'flex h-full w-full items-center justify-end gap-x-4',
                    'y-2',
                  )}
                >
                  <Button
                    variant="solid"
                    className="flex max-h-[30px] w-full max-w-[120px] justify-center rounded-md border"
                  >
                    Commit
                  </Button>

                  <Dialog
                    size="small"
                    overlayClassName=" z-[10002] bg-black/30 backdrop-blur-3xl"
                    displayClose={false}
                  >
                    <Dialog.Trigger asChild>
                      <Button
                        variant="solid"
                        className="flex max-h-[30px] w-full max-w-[120px] justify-center rounded-md border"
                      >
                        New
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content
                      className={cn(
                        'group/content z-10002 h-fit',
                        'bg-cool-gray-1100',
                      )}
                    >
                      <Dialog.Header>
                        <Dialog.Title className="sr-only">
                          Are you sure?
                        </Dialog.Title>
                        <Dialog.Description className="w-full text-center">
                          Heads up! If you bail now, everything you’ve done goes
                          *poof*. Still wanna start over?
                        </Dialog.Description>
                      </Dialog.Header>
                      <Dialog.Body>
                        <div className="flex w-full flex-row justify-evenly">
                          <Button
                            variant="solid"
                            className="flex w-full max-w-[150px] justify-center border"
                            onClick={() => {
                              pdfActions.reset({});
                              highlighterActions.resetNotes();
                              ObjectUtils.keys(LOCAL_STORAGE_KEYS).forEach(
                                (value) => localStorage.removeItem(value),
                              );
                            }}
                          >
                            Yes, im sure
                          </Button>
                          <Button
                            variant="solid"
                            className="flex w-full max-w-[150px] justify-center border"
                          >
                            I lied
                          </Button>
                        </div>
                      </Dialog.Body>
                    </Dialog.Content>
                  </Dialog>
                </div>
              </div>
            );
          }}
        </Toolbar>
      </div>
    ),
  });

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden rounded-md border">
      <SearchViewer searchPluginInstance={searchPluginInstance} />
      <div className="flex-1 overflow-hidden">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={fileUrl}
            defaultScale={SpecialZoomLevel.PageFit}
            plugins={[
              defaultLayoutPluginInstance,
              searchPluginInstance,
              zoomPluginInstance,
              selectionModePluginInstance,

              {
                onCanvasLayerRender(props) {
                  console.log('NDJKBFASLF ', props);
                },
                onTextLayerRender: ({ ele, pageIndex, scale, status }) => {
                  console.log('HEREEE');
                  if (status === LayerRenderStatus.PreRender) {
                    ele.normalize();
                    Array.from(ele.childNodes).forEach((child) => {
                      if (
                        child.nodeType === Node.TEXT_NODE &&
                        !child.textContent?.trim()
                      ) {
                        ele.removeChild(child);
                      }
                    });
                  }
                },
                onAnnotationLayerRender({ container }) {
                  console.log('PREEEE');
                  // Remove any orphaned DOM nodes that may have been added by failed highlights
                  Array.from(container.childNodes).forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                      const el = node as HTMLElement;
                      if (
                        el.classList.contains('rpv-highlight') &&
                        !el.textContent?.trim()
                      ) {
                        container.removeChild(el);
                      }
                    }
                  });
                },
              },
              highlightPluginInstance,
            ]}
            theme="dark"
            enableSmoothScroll={true}
          />
        </Worker>
      </div>
    </div>
  );
};
