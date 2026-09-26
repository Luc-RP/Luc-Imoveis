# LUC Imóveis

Site privado de pesquisa e curadoria imobiliária com identidade visual industrial em verde. Este repositório pertence à organização Luc-RP, mas é independente dos demais projetos da organização.

## Primeira tela implementada

- Marca **LUC Imóveis**, navegação **Alugar, Comprar, Lançamentos, Descobrir e Anúncios** e botões visuais **Criar conta** e **Entrar**.
- Busca demonstrativa por finalidade, localização, tipo de imóvel e área mínima, com exemplos fictícios de galpões e estúdios em Indaiatuba (SP).
- Layout responsivo para computador e celular, com ilustrações próprias em estilo industrial.
- Links e botões de funcionalidades futuras identificados como **em desenvolvimento**.

> **Importante:** os imóveis, características e preços exibidos são apenas ilustrativos. Não representam anúncios reais. Ainda não há banco de dados, autenticação, painel administrativo ou bot.

## Visualizar privadamente pelo GitHub Codespaces

1. No GitHub, abra este repositório privado e clique em **Code → Codespaces → Create codespace on main**.
2. Aguarde a criação do ambiente. O arquivo `.devcontainer/devcontainer.json` prepara automaticamente um servidor HTTP para a primeira tela na **porta 3000**.
3. No Codespaces, acesse a aba **Ports**. Confirme que a porta **3000** está com visibilidade **Private**, não Public; se necessário, altere a visibilidade para Private.
4. Clique no endereço encaminhado da porta 3000 e escolha **Open in Browser** para visualizar a página inicial.
5. Ao terminar, pare ou exclua o Codespace para evitar consumo desnecessário de horas e armazenamento do GitHub.

Alternativa local: na raiz do repositório, execute `python3 -m http.server 3000` e abra `http://localhost:3000` no navegador.

## Estrutura

- `index.html` — página inicial e estrutura acessível.
- `styles.css` — identidade visual e adaptação para dispositivos móveis.
- `app.js` — interações da navegação e dos filtros **somente demonstrativos**.
- `.devcontainer/devcontainer.json` — configuração da prévia privada no Codespaces.

## Próximas etapas planejadas

- Área administrativa com autenticação para cadastrar e editar anúncios manualmente.
- Integração futura com bot apenas por fontes e meios de acesso permitidos.
- Cadastro voluntário para possíveis notificações por e-mail e WhatsApp, com consentimento e controles de privacidade.

A Vercel fica reservada para uma etapa posterior; nenhum deploy foi feito. Não armazene senhas, tokens ou dados pessoais no código. O Viva Real foi utilizado somente como referência estrutural, sem copiar sua marca ou conteúdo.