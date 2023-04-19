import pool from './db'
import { ACTION } from "../../constants/constants"
import { User } from '../server.d'
import { Server as SocketIOServer } from 'socket.io';
import { QueryResult, PoolClient } from 'pg';

export function handleSockIOEvents(io: SocketIOServer){
    
    async function queryDatabase(query: string, params: any[] = []): Promise<QueryResult> {
        const client: PoolClient = await pool.connect();
        try {
        const res: QueryResult = await client.query(query, params);
        return res;
        } finally {
        console.log(`Released back to pool.`)
        client.release(); // release the connection back to the pool
        }
    }

    // call the queryDatabase function whenever you need to execute a query
    async function getUsersByEmail(email: string): Promise<User[]> {
        const query = 'SELECT * FROM userdetails WHERE email = $1 ';
        const params = [email];
        const res = await queryDatabase(query, params);
        return res.rows as User[];
    }
    
    const saveMsg = async (message: string) => {
        const query = 'INSERT ......'
    }
    
    // Example usage:
    (async () => {
        const users = await getUsersByEmail('abc@gmail.com');
        console.log(users);
    })();

    //If connected
    io.on('connection', socket => {
    
        console.log(`Successful connection. Socket ID: ${socket.id}`)
    
        //Receive Messages from Client
        socket.on(ACTION.SendFowardtoServer, (message:string) => {
        console.log(message)
        //io.emit(ACTION.SendBacktoClient, `Come Back from Server: ${message}`)   io.emit boardcasts message to EVERY socket
        socket.broadcast.emit(ACTION.SendBacktoClient, `Come Back from Server: ${message}`)   //socket.broadcast.emit boardcast to everyone except the sender
    
        try {
            (async () => {    //WILL CHANGE TO INSERT INTO
            const res = await getUsersByEmail(message);
            console.log(res)
            const users = res.map(user => user.username).join(', ');  // Construct a message using the retrieved data, use .join to join them into single parameter
            socket.broadcast.emit(ACTION.SendBacktoClient, `Users with email ${message}: ${users}`);  // Send the message to the client
            })()
        } catch (error) {
            console.log(`Error occurs: ${error}`)
        }
    
        })
    })
}

