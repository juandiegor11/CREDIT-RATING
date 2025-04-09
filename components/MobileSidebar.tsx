import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function MobileSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogContent className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <DialogTitle>
          <VisuallyHidden>Menú de navegación</VisuallyHidden>
        </DialogTitle>
        <nav>
          <ul>
            <li>
              <a href="/" className="block p-4 hover:bg-gray-100">
                Inicio
              </a>
            </li>
            <li>
              <a href="/Creditos" className="block p-4 hover:bg-gray-100">
                Créditos
              </a>
            </li>
            <li>
              <a href="/Result" className="block p-4 hover:bg-gray-100">
                Resultados
              </a>
            </li>
          </ul>
        </nav>
      </DialogContent>
    </Dialog>
  );
}