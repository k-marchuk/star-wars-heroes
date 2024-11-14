import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

window.scrollTo = vi.fn();

// MemoryRouter wrapper that includes initialRoutes
const MemoryRouterWithInitialRoutes = ({
  children,
  initialRoutes,
}: {
  children: React.ReactNode;
  initialRoutes: string[];
}) => {
  return (
    <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
      initialEntries={initialRoutes}
    >
      {children}
    </MemoryRouter>
  );
};

interface CustomRenderOptions extends RenderOptions {
  initialRoutes?: string[];
}

// create a customRender that wraps the UI in a memory Router
// initialEntries array can be specified in options object
const customRender = (
  ui: React.ReactNode,
  options: CustomRenderOptions = {}
) => {
  return render(ui, {
    wrapper: (args) =>
      MemoryRouterWithInitialRoutes({
        ...args,
        initialRoutes: options.initialRoutes || ['/'],
      }),
    ...options,
  });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
