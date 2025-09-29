# 📖 Project README

## 🔐 ECDSA Signature Verification with secp256k1 in a ZK Circuit

This project demonstrates **secp256k1 ECDSA signature verification** inside a zkVM/circuit using Rust-like syntax with `dep::ecrecover` and `dep::std::ecdsa_secp256k1`. It shows two approaches:

1. **Recovering the Ethereum-style address from a signature** (like `ecrecover`)
2. **Verifying a secp256k1 signature against a public key**

---

## ✨ Features

* ✅ Verify signatures over the **secp256k1 curve**
* ✅ Accept raw public key coordinates (`pub_key_x`, `pub_key_y`)
* ✅ Work with pre-hashed messages (`[u8; 32]`)
* ✅ Compare against expected signer addresses (`Field`)
* ✅ Suitable for **ZK proofs** and **blockchain signature verification**

---

## 📂 Project Structure

```bash
.
├── src/
│   ├── main.nr       # Entry circuit demonstrating signature verification
│   └── lib.nr        # (optional) helper functions
├── README.md         # Project documentation
```

---

## 🛠️ Dependencies

This project uses two cryptographic libraries:

* `dep::ecrecover` → Ethereum-style recovery (recover address from signature)
* `dep::std::ecdsa_secp256k1` → Low-level ECDSA signature verification

---

## 🚀 Usage

### 1. Address Recovery (Ethereum Style)

```rust
use dep::ecrecover;

fn main(
    pub_key_x: [u8; 32],
    pub_key_y: [u8; 32],
    signature: [u8; 64],
    hashed_message: pub [u8; 32],
    expected_address: pub Field,
) {
    let address = ecrecover::ecrecover(pub_key_x, pub_key_y, signature, hashed_message);
    assert(address == expected_address, "Address does not match expected address");
}
```

✅ Use this if you want to derive and check the signer’s Ethereum address.

---

### 2. Direct Signature Verification (secp256k1)

```rust
use dep::std::ecdsa_secp256k1;

fn main(
    pub_key_x: [u8; 32],
    pub_key_y: [u8; 32],
    signature: [u8; 64],
    hashed_message: pub [u8; 32],
) {
    let isValid =
        ecdsa_secp256k1::verify_signature(pub_key_x, pub_key_y, signature, hashed_message);
    assert(isValid);
}
```

✅ Use this if you just want to confirm whether a signature is valid for a given public key.

---

## 🧪 Example

Suppose we have the following inputs:

* **Public Key**: `(pub_key_x, pub_key_y)` from Ethereum account
* **Message**: `"Hello ZK"` → hashed with keccak256 → `[u8; 32]`
* **Signature**: 64-byte secp256k1 signature
* **Expected Address**: `0x1234...abcd` (only for recovery mode)

Run either version of `main` depending on your verification style:

* **Address Recovery Mode** → checks signer’s Ethereum address matches `expected_address`
* **Verification Mode** → checks signature validity without deriving address

---

## ⚡ Applications

* Ethereum/ZK Rollups → Verify Ethereum signatures inside ZK proofs
* On-chain identity verification
* Cross-chain message signing
* zkLogin and zkAuth systems

---

## 📌 Notes

* The message must already be **hashed** (`[u8; 32]`).
* The public key must be passed as **uncompressed coordinates** (`pub_key_x`, `pub_key_y`).
* Signature must follow the **64-byte (r || s)** format.

---

## 📜 License

MIT License – feel free to use, modify, and build upon this project.

