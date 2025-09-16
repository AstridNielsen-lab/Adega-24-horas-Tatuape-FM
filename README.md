# 🍷 Adega Rádio Tatuapé FM 24 Horas

Sistema de e-commerce e gerenciamento de pedidos para a Adega Rádio Tatuapé FM, oferecendo uma experiência completa de compra online com entrega 24 horas.

## 🚀 Funcionalidades

### 🛍️ Catálogo de Produtos
- Visualização de produtos por categorias
- Busca em tempo real
- Filtros por categoria
- Indicadores de produtos gelados
- Exibição de preços e descontos
- Status de disponibilidade em tempo real

### 🛒 Carrinho de Compras
- Adição/remoção de produtos
- Atualização de quantidades
- Cálculo automático do total
- Persistência do carrinho
- Checkout simplificado

### 👤 Gestão de Usuários
- Cadastro de usuários
- Perfil com dados de entrega
- Histórico de pedidos
- Edição de informações pessoais
- Gerenciamento de endereços

### 📦 Sistema de Pedidos
- Acompanhamento em tempo real
- Timer de entrega inteligente
  - Tempo estimado baseado no horário (30min dia/60min madrugada)
  - Alertas sonoros a cada 10 minutos
  - Mensagens atualizadas a cada 5 minutos
  - Período de cortesia de 3 minutos após tempo estimado
  - Confirmação automática de recebimento

### 💳 Pagamento
- Integração com Mercado Pago
- Opção de pagamento via PIX
- Status de pagamento em tempo real
- Confirmação automática

### 📱 Comunicação
- Integração com WhatsApp
- Detalhes do pedido formatados
- Notificações de status
- Comunicação direta com a loja

### 🎵 Recursos Extras
- Player da Rádio Tatuapé FM
- Integração com iFood
- Política de cookies
- Design responsivo

## 🛠️ Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- Zustand (Gerenciamento de Estado)
- Vite
- Lucide React (Ícones)
- React Router DOM
- React Helmet Async (SEO)

## 🔒 Segurança

- Validação de dados
- Proteção contra XSS
- Sanitização de inputs
- Gestão segura de estados
- Política de privacidade

## 📱 Compatibilidade

- Design responsivo
- Suporte a dispositivos móveis
- PWA ready
- Cross-browser

## 🌙 Modo Noturno

- Interface dark mode por padrão
- Cores adaptativas
- Contraste otimizado
- Ícones temáticos

## 🎨 Design

- UI/UX profissional
- Animações suaves
- Feedback visual
- Microtransições
- Loading states

## 📈 Performance

- Carregamento otimizado
- Code splitting
- Lazy loading
- Caching estratégico
- Otimização de imagens

## 🔄 Estados do Pedido

1. **Recebido**
   - Confirmação inicial
   - Início do timer
   - Mensagem de preparação

2. **Em Preparação**
   - Atualizações a cada 5 minutos
   - Mensagens personalizadas
   - Barra de progresso

3. **Em Entrega**
   - Tracking em tempo real
   - Alertas sonoros
   - Mensagens de proximidade

4. **Finalizado**
   - Confirmação de recebimento
   - Atualização do histórico
   - Feedback do cliente

## 🕒 Sistema de Timer

### Mensagens Durante Entrega
- \> 30min: "Recebemos seu pedido e já estamos preparando! 📝"
- \> 25min: "Seu pedido está sendo preparado com todo cuidado! 👨‍🍳"
- \> 20min: "Estamos empacotando seu pedido com carinho! 🎁"
- \> 15min: "Seu pedido está pronto e será enviado em breve! 🚀"
- \> 10min: "Nosso entregador está a caminho! 🛵"
- \> 5min: "Seu pedido está muito próximo! ⏳"
- Final: "Entrega iminente! Fique atento! 🎯"

### Período de Cortesia
1. "O tempo estimado foi atingido! Seu pedido já chegou? 🤔"
2. "Por favor, confirme se você recebeu seu pedido! 📦"
3. "Não esqueça de clicar em 'Recebido' quando seu pedido chegar! ✨"

## 📞 Contato

- WhatsApp: (11) 97060-3441
- Email: radiotatuapefm@gmail.com
- Endereço: Vila Regente Feijó, São Paulo - SP
- Horário: 24 horas - Todos os dias

## 🎯 Próximas Atualizações

- [ ] Sistema de avaliações
- [ ] Programa de fidelidade
- [ ] Cupons de desconto
- [ ] Recomendações personalizadas
- [ ] Chat em tempo real
