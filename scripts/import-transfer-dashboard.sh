#!/bin/bash

echo "🚀 Importando Dashboard de Transferências no Grafana..."

# Aguardar Grafana estar pronto
echo "⏳ Aguardando Grafana estar pronto..."
sleep 10

# Importar dashboard
echo "📊 Importando dashboard..."
curl -X POST http://localhost:3001/api/dashboards/import \
  -H "Content-Type: application/json" \
  -u admin:admin123 \
  -d @transfer-dashboard.json

echo "✅ Dashboard de Transferências importado com sucesso!"
echo "🌐 Acesse: http://localhost:3001"
echo "👤 Login: admin / admin123" 