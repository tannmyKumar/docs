# Dhankirti Platform — Environment Access

Quick reference for production, UAT, and local URLs, database connections, and infrastructure access.

---

## Production

### Customer

| | |
|---|---|
| **URL** | https://app.dhankirti.co.in/login |
| **Email** | ktanmay1130@gmail.com |
| **Password** | T1nm1y@123 |

### Internal

| | |
|---|---|
| **URL** | https://portal.dhankirti.co.in/ |
| **Email** | superadmin@dhankirti.com |
| **Password** | Superadmin@100 |

### Backend API

Same backend for both customer and internal apps.

| | |
|---|---|
| **URL** | https://app.api.dhankirti.co.in/login |

---

## UAT

### Customer

| | |
|---|---|
| **URL** | https://uat.dhankirti.co.in/login |
| **Email** | tannmay@dhankirti.co.in |
| **Password** | Tanmay@123 |

### Internal

| | |
|---|---|
| **URL** | https://uat.portal.dhankirti.co.in/ |
| **Email** | superadmin@dhankirti.co.in |
| **Password** | T1nm1y@12345 |

### Backend API

Same backend for both customer and internal apps.

| | |
|---|---|
| **URL** | https://uat.api.dhankirti.co.in/login |

---

## Local

### Customer

| | |
|---|---|
| **Email** | ktanmay1130@gmail.com |
| **Password** | Tanmay@123 |

### Internal

| | |
|---|---|
| **Email** | superadmin@dhankirti.local |
| **Password** | Tanmay@123 |

---

## Database Connections

### UAT Database

```bash
ssh -i dhankirti-aws-uat-key.pem -L 5433:127.0.0.1:5432 ubuntu@13.234.1.168
```

```
DATABASE_URL="postgresql://dhankirti:s9u91D5X5cHzrzHs0dyis4ur@localhost:5433/dhankirti"
```

### Production Database

```bash
ssh -i dhankirti-aws-uat-key.pem -L 5433:dhankirti-v2-prod-postgres.cfioicscwbfx.ap-south-1.rds.amazonaws.com:5432 ubuntu@13.206.149.194 -N
```

---

## Infrastructure

### Server Status (Uptime Kuma)

| | |
|---|---|
| **URL** | https://status.dhankirti.co.in/ |
| **Email** | tech@dhankirti.co.in |
| **Password** | Vishal@62618078 |
