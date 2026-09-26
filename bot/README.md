# Bot LUC Imóveis — primeira versão

Este é o primeiro núcleo funcional do bot: recebe um CSV fornecido pelo usuário ou por uma fonte com autorização, identifica links repetidos, separa galpões/estúdios/espaços comerciais, sinaliza possíveis duplicatas e grava em um banco SQLite local.

O bot NÃO pesquisa nem extrai automaticamente páginas do Chaves na Mão, Facebook ou outros portais. Uma integração automática só será acrescentada quando houver um meio de acesso autorizado. O GitHub Pages continua hospedando apenas o site estático.

O repositório é público: jamais inclua credenciais, dados pessoais de clientes ou banco real nele. As pastas .local e saida são ignoradas pelo Git.

## Como testar

É necessário Python 3.10 ou superior. Não precisa instalar bibliotecas.

1. Na pasta raiz do projeto, execute:
   python bot/luc_bot.py importar --arquivo bot/exemplos/entrada_exemplo.csv
2. Veja os resultados:
   python bot/luc_bot.py listar
3. Teste a exportação (ela estará vazia porque os dados de exemplo não têm autorização para publicação):
   python bot/luc_bot.py exportar --saida bot/saida/catalogo.json

Para testar com registros reais, crie um arquivo CSV com as colunas do exemplo, usando somente anúncios inseridos manualmente ou fornecidos por fontes autorizadas. O delimitador é ponto e vírgula. Na coluna publicacao_autorizada, use sim somente quando tiver certeza do direito de publicação. A aprovação editorial é uma segunda etapa explícita:

   python bot/luc_bot.py aprovar --id 1

O comando aprovar rejeita itens sem autorização de publicação. Só os itens autorizados E aprovados entram no JSON exportado. Antes de publicar, confira preço e disponibilidade com o anunciante.

As URLs devem ser HTTPS, com domínio. O bot não abre os links. Se o anúncio do Chaves na Mão reaparecer com outro slug mas o mesmo ID, o bot o reconhece como repetido. Registros diferentes com mesmo bairro, tipo, área e preço são sinalizados, sem exclusão automática.

Para rodar os testes:
   python -m unittest discover -s bot/testes -v

## Próxima etapa

Conectar a saída JSON aprovada ao site e acrescentar uma interface de revisão. O catálogo atual do site permanece intacto enquanto desenvolvemos e testamos este módulo.
