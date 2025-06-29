#!/bin/bash

echo "Importando dashboard do HubConductor..."

# Importar dashboard
curl -X POST http://admin:admin123@localhost:3001/api/dashboards/db \
  -H "Content-Type: application/json" \
  -d @grafana/dashboards/hubconductor-dashboard.json

echo ""
echo "✅ Dashboard importado!"
echo "📊 Acesse: http://localhost:3001"
echo "🔍 Procure por 'HubConductor POC Dashboard'" 