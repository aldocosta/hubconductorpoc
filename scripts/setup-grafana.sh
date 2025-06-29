#!/bin/bash

echo "Configurando Grafana..."

# Aguardar o Grafana inicializar
sleep 10

# Configurar data source do Prometheus
curl -X POST http://admin:admin123@localhost:3001/api/datasources \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Prometheus",
    "type": "prometheus",
    "url": "http://hubconductor:3000",
    "access": "proxy",
    "isDefault": true
  }'

echo ""
echo "✅ Grafana configurado!"
echo "🌐 Acesse: http://localhost:3001"
echo "👤 Login: admin"
echo "�� Senha: admin123" 