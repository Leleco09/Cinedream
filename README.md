# 🎬 CinePrivado - Catálogo Pessoal de Filmes e Séries (Etapa 1)

Projeto de catálogo privado com visual moderno inspirado na Netflix, otimizado para celulares Android e projetado com foco em **compatibilidade com o aplicativo Rave**.

---

## 📱 Como Testar no Celular Android

### Opção 1: Via Termux (Servidor Local)
Se você utiliza o **Termux** no Android:
1. Navegue até a pasta do projeto:
   ```bash
   cd /data/user/0/com.agy/files/.gemini/antigravity-app/scratch/cine-privado
   ```
2. Inicie o servidor HTTP com Python:
   ```bash
   python3 -m http.server 8080
   ```
3. Abra o navegador do seu celular (Chrome, Kiwi, Brave, Samsung Internet) e acesse:
   ```
   http://localhost:8080
   ```

### Opção 2: Via Aplicativos Editores Web no Android
Você também pode abrir a pasta `cine-privado` diretamente em editores com visualizador web integrado como:
- **Acode** (com plugin de Live Server ou Web Server)
- **TrebEdit**
- **Spck Editor**

---

## 🚀 Como Testar a Compatibilidade com o Rave

O aplicativo **Rave** permite sincronizar vídeos entre amigos. Para que uma página funcione no Rave, ela precisa conter uma tag `<video>` HTML5 semântica e direta.

### Passo a passo para testar:

1. **Obtenha o Link do Título**:
   - No catálogo `index.html`, toque em qualquer título de demonstração (ex: *Tears of Steel* ou *Crônicas Cósmicas*).
   - No modal de detalhes, toque em **"Copiar Link para o Rave"**.
   - Ou acesse a página dedicada `player.html?id=filme-tears-of-steel` e copie o link no topo.

2. **Abra o Rave no Android**:
   - Abra o aplicativo **Rave**.
   - Toque no botão de adicionar sala (**`+`** no canto inferior direito).
   - Selecione a opção **Web**.
   - Cole a URL do player na barra de endereço do Rave e confirme.

3. **Validação**:
   - O Rave irá inspecionar o elemento `<video>` da página, capturar o fluxo de vídeo `.mp4` e abrir a sala de reprodução sincronizada.

> **Dica para Teste em Rede Local vs. Internet**:
> Se o servidor estiver rodando apenas no `localhost:8080` do mesmo aparelho celular onde o Rave está instalado, o Rave conseguirá acessar `http://localhost:8080/player.html?id=filme-tears-of-steel`. Quando você for testar com amigos à distância, o site será hospedado com endereço público HTTPS (conforme planejado nas próximas etapas).

---

## 📂 Estrutura de Arquivos Criada

- `index.html`: Página principal com navegação por abas (Todos, Filmes, Séries), barra de pesquisa instantânea, pílulas de gênero, banner de destaque e modal inferior de detalhes.
- `player.html`: Página de reprodução dedicada com tag `<video>` direta e sem distrações para máxima compatibilidade com a webview do Rave.
- `css/style.css`: Estilização escura estilo Netflix, tipografia legível e proporções de toque pensadas para telas mobile Android.
- `css/player.css`: Estilização do player e da barra lateral de episódios para séries.
- `js/mock-data.js`: Dados fictícios de demonstração com filmes e séries com temporadas e vídeos de domínio público.
- `js/app.js`: Lógica de busca, filtragem e interação da página principal.
- `js/player.js`: Carregamento dinâmico de vídeos e navegação entre episódios via parâmetros de URL.
