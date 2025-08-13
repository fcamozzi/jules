from rest_framework import serializers
from .models import Client, Contract

# Serializer para ser usado de forma aninhada, mostrando apenas o essencial.
class ClientNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name']

class ContractSerializer(serializers.ModelSerializer):
    # Usando o serializer aninhado para exibir informações do cliente na listagem de contratos.
    # read_only=True porque a atribuição do cliente será feita pelo ID no POST/PUT.
    client = ClientNestedSerializer(read_only=True)

    # client_id é usado para criar/atualizar o contrato, esperando um ID.
    client_id = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(), source='client', write_only=True
    )

    class Meta:
        model = Contract
        fields = [
            'id', 'title', 'description', 'value',
            'start_date', 'end_date', 'client', 'client_id',
            'created_at', 'updated_at'
        ]

class ClientSerializer(serializers.ModelSerializer):
    # O serializer de contrato completo pode ser usado aqui se quisermos todos os detalhes
    # quando visualizamos um cliente específico.
    contracts = ContractSerializer(many=True, read_only=True)

    class Meta:
        model = Client
        fields = ['id', 'name', 'email', 'phone', 'address', 'created_at', 'updated_at', 'contracts']
