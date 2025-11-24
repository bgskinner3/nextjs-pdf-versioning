import { highlightPlugin, Trigger } from '@react-pdf-viewer/highlight';
import type {
  HighlightPlugin,
  RenderHighlightTargetProps,
  RenderHighlightContentProps,
  RenderHighlightsProps,
} from '@react-pdf-viewer/highlight';
import { useCallback } from 'react';
import { normalizeSelectionData } from '@/utils';
import {
  RenderHighlightTarget,
  RenderHighlightContent,
  RenderHighlights,
} from '@/ui';
import {
  useHighlighterValues,
  useHighlighterActions,
  usePdfValues,
} from '@/hooks';
import { DEFAULT_SELECTION_DATA } from '@/constants';

export function useSafeHighlightPlugin(): HighlightPlugin {
  const values = useHighlighterValues();
  const actions = useHighlighterActions();
  const pdfValues = usePdfValues();

  // Clamp selection data before sending to plugin

  const renderHighlightTarget = useCallback(
    (props: RenderHighlightTargetProps) => {
      const safeSelectionData = props.selectionData
        ? normalizeSelectionData(props.selectionData)
        : undefined;
      // normalize the DOM nodes of the selected divs
      safeSelectionData?.divTexts.forEach((div) => {
        const divNode: HTMLElement | null = document.querySelector(
          `[data-div-index="${div.divIndex}"]`,
        );
        if (divNode) divNode.normalize();
      });
      return (
        <RenderHighlightTarget
          props={{ ...props, selectionData: safeSelectionData }}
          values={values}
          actions={actions}
          version={pdfValues.currentVersion!}
        />
      );
    },
    [values, actions, pdfValues.currentVersion],
  );

  const renderHighlightContent = useCallback(
    (props: RenderHighlightContentProps) => {
      const safeSelectionData = props.selectionData
        ? normalizeSelectionData(props.selectionData)
        : DEFAULT_SELECTION_DATA;
      return (
        <RenderHighlightContent
          props={{ ...props, selectionData: safeSelectionData }}
          values={values}
          actions={actions}
          version={pdfValues.currentVersion!}
        />
      );
    },
    [values, actions, pdfValues.currentVersion],
  );

  const renderHighlights = useCallback(
    (props: RenderHighlightsProps) => {
      return <RenderHighlights props={props} values={values} />;
    },
    [values],
  );

  const pluginInstance = highlightPlugin({
    trigger: Trigger.None,
    renderHighlightTarget,
    renderHighlightContent,
    renderHighlights,
  });

  return pluginInstance;
}
