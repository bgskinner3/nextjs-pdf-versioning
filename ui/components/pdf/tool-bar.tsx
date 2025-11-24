import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import type { ToolbarProps } from '@react-pdf-viewer/toolbar';
const ToolBa = () => {
  const { Toolbar } = toolbarPlugin();
  return (
    <Toolbar>
      {/* {(slots: ToolbarProps) => {
        // Remove Search from the toolbar
        const { Search, ...rest } = slots;

        // Render the rest using the built-in renderer
        return (
          <div>
            <slots.Zoom />
          </div>
        );
      }} */}
    </Toolbar>
  );
};
