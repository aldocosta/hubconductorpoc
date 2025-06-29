#!/bin/bash

echo "🚀 Importando Dashboard de Login no Grafana..."

# Aguardar Grafana estar pronto
echo "⏳ Aguardando Grafana estar pronto..."
sleep 5

# Importar dashboard
echo "📊 Importando dashboard de login..."
curl -X POST http://localhost:3001/api/dashboards/import \
  -H "Content-Type: application/json" \
  -u admin:admin123 \
  -d @login-dashboard.json

echo "✅ Dashboard de Login importado com sucesso!"
echo "🌐 Acesse: http://localhost:3001"
echo "👤 Login: admin / admin123"
echo "📊 Dashboard: HubConductor - Login" 