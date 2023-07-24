import { Client } from "pg";
import "dotenv/config";

const client = new Client({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || "5432"),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
});

async function migrate() {
    await client.connect();

    await client.query(`
        create table mails(
            id serial primary key,
            sender varchar(50) not null,
            subject varchar(50) not null,
            receiver text not null,
            body text not null,
            ccs text,
            bccs text
        );
    `);
    await client.end();
}

migrate();
