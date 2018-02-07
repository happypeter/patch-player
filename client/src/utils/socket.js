import { SERVER } from '../constants/ApiConstants'

import io from 'socket.io-client'
const socket = io(SERVER)

export default socket
