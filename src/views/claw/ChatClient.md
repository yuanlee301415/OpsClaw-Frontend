# ChatClient

## connect 请求体

```json
{
  "type": "req",
  "id": "fd14b90e-2ac4-435f-b1fc-9f06d0ce16ae",
  "method": "connect",
  "params": {
    "minProtocol": 3,
    "maxProtocol": 3,
    "client": {
      "id": "openclaw-control-ui",
      "version": "control-ui",
      "platform": "Win32",
      "mode": "webchat",
      "instanceId": "bb775fb8-3079-4d4b-b043-b0ca55122ac1"
    },
    "role": "operator",
    "scopes": ["operator.admin", "operator.read", "operator.write", "operator.approvals", "operator.pairing"],
    "device": {
      "id": "554ef916a282b174904218e44bca5b906482862fe23979c85b69a3ee521c460d",
      "publicKey": "dkvJazGHq-Cl-rRHiPD1EBKC8eWTk-wm_Y3yzSrQCHQ",
      "signature": "jmQDyx5BFIeDasatfYVlqbb00eV7P78YrvGH3f5k9NK6NpuGJcHr5d3wZfMGwrgQ0vq7907Vmkt9MYkhAiI9Bw",
      "signedAt": 1774595049134,
      "nonce": "00c8f0b6-1e0d-43e6-a30b-14a86080ae03"
    },
    "caps": ["tool-events"],
    "auth": {
      "password": "123456"
    },
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0",
    "locale": "zh-CN"
  }
}
```

## 对话请求体

```json
{
  "type": "req",
  "id": "48bc4320-e03d-4677-97dc-cce7be493a52",
  "method": "chat.send",
  "params": {
    "sessionKey": "agent:main:main",
    "message": "Who are you?",
    "deliver": false,
    "idempotencyKey": "87e76052-dcc3-4566-ad65-849d039e23c1"
  }
}
```

## Chat "delta" 状态消息

```json
{
  "runId": "37c01d16-dfa2-47f8-9f42-e40aa9ea1db1",
  "sessionKey": "agent:main:main",
  "seq": 2,
  "state": "delta",
  "message": {
    "role": "assistant",
    "content": [
      {
        "type": "text",
        "text": "cc"
      }
    ],
    "timestamp": 1775007585409
  }
}
```

## Chat "final" 状态消息

```json
{
  "runId": "37c01d16-dfa2-47f8-9f42-e40aa9ea1db1",
  "sessionKey": "agent:main:main",
  "seq": 13,
  "state": "final",
  "message": {
    "role": "assistant",
    "content": [
      {
        "type": "text",
        "text": "上海今天 🌦 15°C，体感也是 15°C，风力不大（6km/h）。有点小雨，出门记得带伞！☔"
      }
    ],
    "timestamp": 1775007585417
  }
}
```
