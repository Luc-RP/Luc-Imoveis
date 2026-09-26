# LUC Imóveis

Primeira versão demonstrativa do site LUC Imóveis: identidade visual industrial em verde, busca ilustrativa de galpões e estúdios em Indaiatuba (SP) e layout responsivo. Este projeto é independente dos demais projetos da organização Luc-RP.

## Prévia no GitHub Pages

O repositório foi tornado **público** para que a primeira tela possa ser visualizada gratuitamente pelo GitHub Pages, sem Codespaces e sem consumir recursos da Vercel.

**Configuração inicial a fazer no GitHub, por um administrador do repositório:**

1. Abra `https://github.com/Luc-RP/Luc-Imoveis/settings/pages`.
2. Em **Build and deployment → Source**, selecione **Deploy from a branch**.
3. Em **Branch**, escolha **main** e a pasta **/(root)**.
4. Clique em **Save** e acompanhe o primeiro deploy na aba **Actions**.
5. Quando a publicação terminar, abra **https://luc-rp.github.io/Luc-Imoveis/** ou use o botão **Visit site** da tela Pages. O endereço só funcionará depois da ativação e conclusão do deploy.

A partir dessa configuração, alterações publicadas na `main` serão refletidas no endereço do GitHub Pages. O arquivo `.nojekyll` permite servir os arquivos estáticos diretamente.

**Atenção:** o repositório e a página do GitHub Pages são públicos. Não cadastre senhas, tokens, contatos reais de clientes, dados internos ou imóveis cuja publicação não tenha sido autorizada. O futuro painel administrativo e o bot precisarão de infraestrutura e autenticação separadas; **GitHub Pages hospeda apenas conteúdo estático**.

## O que já existe

- `index.html` — primeira tela do site com a marca **LUC Imóveis**, menu **Alugar, Comprar, Novidades, Descobrir e Anúncios** e busca demonstrativa por finalidade, localização, tipo e área mínima.
- `styles.css` — layout industrial verde, com versões para computador e celular.
- `app.js` — interações de navegação e filtragem dos **exemplos fictícios**.
- `.nojekyll` — arquivo de configuração para a publicação estática no GitHub Pages.
- `.devcontainer/devcontainer.json` — configuração alternativa de Codespaces, não necessária para o Pages.

## Etapas futuras

Área administrativa com autenticação para cadastrar e editar anúncios, integração do bot por fontes e métodos de acesso autorizados e notificações opcionais por e-mail e WhatsApp mediante consentimento.

**Estado atual:** primeira tela demonstrativa salva no GitHub. Os dez registros em Novidades têm referências de terceiros ainda não verificadas; ainda não existe busca em banco de dados, login funcional, área administrativa nem bot. A página Novidades possui dez registros externos para apresentação, com valores, áreas e disponibilidade ainda não validados. O Viva Real foi usado somente como referência estrutural, sem copiar marca ou conteúdo.

## Novidades

O menu **Novidades** abre `novidades.html`, com dez registros externos adicionados ao catálogo do site e filtros por bairro, tipo, área e ordenação. O endereço anterior (`lancamentos.html`) redireciona para a nova página. **Novidades** significa itens recém-adicionados ao LUC Imóveis, não lançamentos de empreendimentos imobiliários. Os anúncios foram usados como referências de layout e seus dados ainda exigem conferência na fonte original.
