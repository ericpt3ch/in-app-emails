import { FastifyPluginAsync } from "fastify";
import { EMAIL_WHITELIST } from "../db/user";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get("/", async function (request, reply) {
        return { root: true };
    });

    fastify.post<{
        Body: { email: string };
        Reply: { email: string; isAuthenticated: boolean };
    }>("/login", (request, reply) => {
        if (EMAIL_WHITELIST.includes(request.body.email)) {
            reply.status(200).send({
                isAuthenticated: true,
                email: request.body.email,
            });
        } else
            reply.status(401).send({
                isAuthenticated: false,
                email: request.body.email,
            });
    });

    // TODO: validations
    fastify.post<{
        Body: {
            sender: string;
            subject: string;
            receiver: string;
            body: string;
            ccs: string;
            bccs: string;
        };
    }>("/mail", async (request, reply) => {
        const { sender, subject, receiver, body, ccs, bccs } = request.body;
        const result = await fastify.pg.query(
            "INSERT INTO mails (sender, subject, receiver, body, ccs, bccs) VALUES($1, $2, $3, $4, $5, $6)",
            [
                sender,
                subject,
                receiver,
                body,
                ccs,
                bccs,
            ]
        );
        reply.status(201).send(result.rows[0]);
    });

    fastify.get<{
        Querystring: {
            email: string;
        };
    }>("/received", async (request, reply) => {
        const { email } = request.query;
        const result = await fastify.pg.query(
            "SELECT id, sender, subject, receiver, ccs, body FROM mails WHERE receiver LIKE $1 OR ccs LIKE $1 OR bccs LIKE $1",
            [`%${email}%`]
        );
        reply.status(200).send(result.rows);
    });

    fastify.get<{
        Querystring: {
            email: string;
        };
    }>("/sent", async (request, reply) => {
        const { email } = request.query;
        const result = await fastify.pg.query(
            "SELECT id, sender, subject, receiver, ccs, body FROM mails WHERE sender = $1",
            [email]
        );
        reply.status(200).send(result.rows);
    });

    fastify.get<{
        Params: { id: string };
    }>("/mail/:id", async (request, reply) => {
        const { id } = request.params;
        const result = await fastify.pg.query(
            "SELECT id, sender, subject, receiver, ccs, body FROM mails WHERE id = $1",
            [id]
        );
        reply.status(200).send(result.rows[0]);
    });
};

export default root;
