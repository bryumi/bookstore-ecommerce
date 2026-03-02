"use client";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div>
            <h3 className="font-display font-bold text-xl mb-4 text-gold">
              Sobre Nós
            </h3>
            <p className="text-cream/80 font-sans text-sm leading-relaxed">
              A Livraria Booklovers é sua fonte de grandes histórias e
              conhecimento. Oferecemos uma seleção cuidadosa de livros para
              todos os gostos.
            </p>
          </div>


          <div>
            <h3 className="font-display font-bold text-xl mb-4 text-gold">
              Links Rápidos
            </h3>
            <ul className="space-y-2 font-sans text-sm">
              <li>
                <a
                  href="/"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Catálogo
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Carrinho
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  className="text-cream/80 hover:text-gold transition-colors"
                >
                  Pedidos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-4 text-gold">
              Categorias
            </h3>
            <ul className="space-y-2 font-sans text-sm">
              <li className="text-cream/80">Ficção</li>
              <li className="text-cream/80">Não-ficção</li>
              <li className="text-cream/80">Fantasia</li>
              <li className="text-cream/80">Romance</li>
              <li className="text-cream/80">Thriller</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-4 text-gold">
              Contato
            </h3>
            <ul className="space-y-2 font-sans text-sm text-cream/80">
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>contato@livrariaelegante.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>(11) 98765-4321</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 text-center">
          <p className="text-cream/60 font-sans text-sm">
            © 2026 Livraria Booklovers. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
