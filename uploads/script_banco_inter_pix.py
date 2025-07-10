
import requests

# === CONFIGURAÇÕES ===
client_id = "27dc6392-c910-4cf8-a813-6d9ee3c53d2c"
client_secret = "b27ef11f-89e6-4010-961b-2311afab2a75"
cert_path = "certificado_webhook_extracted/ca.crt"  # Caminho relativo do certificado
webhook_url = "https://seuwebhook.com.br/pix"  # Altere para seu endpoint real

# === 1. GERAR TOKEN ===
def gerar_token():
    url = "https://cdpj.partners.bancointer.com.br/oauth/v2/token"
    headers = { "Content-Type": "application/x-www-form-urlencoded" }
    data = {
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret,
        "scope": "boleto-cobranca.read boleto-cobranca.write pix.read pix.write"
    }

    response = requests.post(url, headers=headers, data=data, verify=cert_path)
    response.raise_for_status()
    return response.json()["access_token"]

# === 2. REGISTRAR WEBHOOK ===
def registrar_webhook(token):
    url = "https://cdpj.partners.bancointer.com.br/pix/api/v2/webhook"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    json_data = {
        "webhookUrl": webhook_url
    }

    response = requests.put(url, headers=headers, json=json_data, verify=cert_path)
    print("📌 Webhook:", response.status_code, response.text)

# === 3. CRIAR COBRANÇA PIX ===
def criar_cobranca(token):
    url = "https://cdpj.partners.bancointer.com.br/pix/v2/cob"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    json_data = {
        "calendario": { "expiracao": 3600 },
        "devedor": {
            "nome": "Cliente Teste",
            "cpf": "12345678900"
        },
        "valor": {
            "original": "10.00"
        },
        "chave": "sua_chave_pix_aqui",
        "solicitacaoPagador": "Envie o comprovante"
    }

    response = requests.post(url, headers=headers, json=json_data, verify=cert_path)
    print("💰 Cobrança:", response.status_code, response.text)

# === EXECUÇÃO ===
if __name__ == "__main__":
    token = gerar_token()
    registrar_webhook(token)
    criar_cobranca(token)
