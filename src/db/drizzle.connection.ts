import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env',
});

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: +process.env.DRIZZLE_PORT,
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUHeSfTv1AAkGGiPUkLqad79qmNm0wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYTI5YWEzNTEtZjhjYy00ZDJmLWIwNGItMzJjYjQxZDJh
MTIxIFByb2plY3QgQ0EwHhcNMjQwNjE1MTA1NDUyWhcNMzQwNjEzMTA1NDUyWjA6
MTgwNgYDVQQDDC9hMjlhYTM1MS1mOGNjLTRkMmYtYjA0Yi0zMmNiNDFkMmExMjEg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKGx5GuB
ws+9P76Vwr2vixmMdAeIq6/n+9ZZ37l0NvIOzhRjc2A1F+pyU+9Dg1fbeadNQ0Ia
rhe2VphkptO2N60poWmVSYS8exaoNKBrUZtzlDCcTPjk/T/s/dTmkoqsWTxGA3kf
lCAdlSVx3iU++hsuTvSfUyykoyhHy8IdpTyOSIo/Dsh7Il8U7BW4HvySaQXFDu75
uSoTXsQu+gi7u78tveiDltrMqLjolFL6RHXinziAp4InnHS+BB3MdHyoJ1FJyml+
FUDy172tSb20nTZj+RjVL1pInP9C7XIMz3kuTY5yitjRwINVEh8kfy0mfwoDYMVo
CjfXNceYaTuvBfDLm7iGZiGwd+I3Og0Fvq0uUQs2dLZ0l3F0yeM/5WRbqlgdvpbK
GYjQLTEKqRNNwuXD328InCFBkLfeBuWfNlZD/C6xNq76YZQfcz0wffzVDCbH3TII
Kiotsb0U1LXtDBhHUol81fKHfjNyjGt+KNHapQby7etY5oGEz51XMQ8OkQIDAQAB
oz8wPTAdBgNVHQ4EFgQUuwNrE8A/3NbeP8BW9VpSnhIFHP4wDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAJkET1h67Fu/qW+2
T/8x6KFqqHNyjSOS2bpA+GDChOYNS07cJYNpw5XZbdviVuMJK6V8bGdLOu3xaeK3
qYnwwrkiODot+/5lcuhnn6uNSObqb2ecLzWx2Tn1nT81NNvNL8Fpso2m4npl6uxv
mgFMhCdpr6hmsEThSO6g2KnXRnVqW9F7MhxE+uCbR15uJ7WRSF18tVxDG5v52M0t
5pnxMAPYUd/X6TdQimOR2MHxZ2QBRyOaL8sHFYRXmiCxkg3TH3t/Sy3B5X2OczvY
ev/dkDTcah1G0msjmQA4QJ+xC0HHJIqGujX5kuD0o6TA5uE+POeJZ/o3GHAad64Y
yHaIniFSbDckQPhrxgDLvZQK3kwYVh8cYoqgo2yErIlQClLNd4g2lOlwvLF5PSYq
b0SekZ6aV248sQrAa4EgGBje2iEq4PE92CwDFcjWOJKNlhYVbEXgKuLth9UiTLEJ
3K+XzExCbu6HoM+1jakY9xk93IhXO0kBIKosrO9U1xN+u0uVaA==
-----END CERTIFICATE-----
`,
  },
});

const db = drizzle(pool);

export default db;
