import socket
import threading
import time

import Serve_test
class classServer:
    def __init__(self,gui_client_name,username):
        self.client_names = []
        self.client_addresses = {}

        self.gui_client_name = gui_client_name
        self.client_add = ''

        self.udp_port = 2005
        self.opp2_name = ''
        self.user_name = username

        self.suspend_threads = False

        self.broadcast_port = 2003
        self.broadcast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.broadcast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.broadcast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        self.broadcast_socket.bind(('', self.broadcast_port))

        self.response_port = 2004
        self.response_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.response_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.response_socket.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        self.response_socket.bind(('', self.response_port))

        self.connection_port = 2012
        self.connection_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.connection_socket.bind(('', self.connection_port))

        self.condition = threading.Condition()
        self.quit_game = False


    # def client_list(self):
    #     return self.client_addresses

    # def send_user_name(self):
    #     while True:
    #

    def broadcastReceive(self):
        print("Receive")

        while True:
            try:
                while self.suspend_threads:
                    with self.condition:
                        self.condition.wait()
                data, address = self.broadcast_socket.recvfrom(1024)
                print("data received")
                self.client_add = address[0]
                print(self.client_add)
                self.opp2_name = data.decode()
                if self.opp2_name != self.user_name and self.opp2_name not in self.client_addresses.keys():
                    self.client_addresses[self.client_add] = self.opp2_name
                    # self.client_names.append(self.opp2_name)

                for key, value in self.client_addresses.items():
                    print(key, value)

            except ConnectionResetError:
                print('Exited out of broadcasg recieve')
                break
            except Exception:
                pass
    def broadcastSend(self):
        print("Sent")

        # response_socket.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, buffer_size)

        while True:
            #with self.lock2:
            try:

                print("In while")
                while self.suspend_threads:
                    with self.condition:
                        self.condition.wait()
                response_message = self.user_name
                print(response_message)
                print((self.client_add, self.udp_port))
                s = self.response_socket.sendto(response_message.encode(), (self.client_add, self.udp_port))
                print(s)
                time.sleep(2)
            except ConnectionResetError:
                print('breaking our of broadcast send')
                break
            except Exception:
                pass

    def get_key_from_value(self,dictionary, value):
        for key, val in dictionary.items():
            if val == value:
                return key
        return None  # Value not found in the dictionary
    def find_clients(self):

        while True:
            try:
                while self.suspend_threads:
                    with self.condition:
                        self.condition.wait()
                data, address = self.connection_socket.recvfrom(8192)
                status = data.decode()
                print('Data im getting')
                print(status)
                print('Data im getting')
                #help = self.client_addresses[address[0]]
                #check = self.get_key_from_value(self.client_addresses,help)
                if status == 'connect' and self.client_addresses[address[0]] not in self.client_names:
                    print('Connection being sent')
                    self.client_names.append(self.client_addresses[address[0]])
                    print('this is client_names')
                    print(self.client_names)
                else:
                    pass

            except ConnectionResetError:
                print('Exiting out of find clients')
                break
            except:
                pass

    def server(self):
        print("in server")

        server_host = socket.gethostname()
        server_ip = socket.gethostbyname(socket.gethostname())
        print("ip "+str(server_ip)+" host: "+str(server_host))

        thread1 = threading.Thread(target=self.broadcastReceive)
        thread1.daemon = True
        thread1.start()

        thread2 = threading.Thread(target=self.broadcastSend)
        thread2.daemon = True
        thread2.start()

        thread3 = threading.Thread(target=self.find_clients)
        thread3.daemon = True
        thread3.start()
        print("Listening")


        while True:

            conn_port = 2017
            conn_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            conn_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            conn_socket.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
            conn_socket.bind(('', conn_port))
            connection_message = 'accepted'

            try:
                if self.gui_client_name != '':
                    self.suspend_threads = True
                    host = self.get_key_from_value(self.client_addresses, self.gui_client_name)
                    print(self.gui_client_name + ' selected')
                    #maybe u need while loop
                    #sending accepted
                    s = conn_socket.sendto(connection_message.encode(), (host, conn_port))
                    if s:
                        broadcast_address = '<broadcast>'
                        broadcast_message = 'not_online_anymore'
                        conn_socket.sendto(broadcast_message.encode(), (broadcast_address, conn_port))
                        print('game started')
                        conn_socket.close()
                        self.response_socket.close()
                        self.connection_socket.close()
                        self.broadcast_socket.close()
                        Serve_test.server_program(self.user_name, self.gui_client_name)
                        self.quit_game = True
                        break
                        #AirHockeyGame.start_game(self.user_name,self.gui_client_name)
                    #game.server()

            except:
                print('Could not send accept message')

                #code for removing client from list

    """
    include this in the tcp connection of the code
except ConnectionResetError:
    print("Connection reset by the server")
    connection = False
except ConnectionRefusedError:
    print("Connection refused by the server")
    connection = False
    """


