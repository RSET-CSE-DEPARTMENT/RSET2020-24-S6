import multiprocessing
import socket
import threading
import time
import ball_test_client

#game = AirHockeyGame()
if __name__ == '__main__':
    multiprocessing.freeze_support()
class classClient:
    def __init__(self,gui_server_name,username):
        self.server_names = []
        self.server_addresses = {}
        self.online_servers = []
        self.gui_server_name = gui_server_name
        self.user_name = username
        self.suspend_threads = False
        self.condition = threading.Condition()
        self.sync = False
        self.offline = False
        self.broadcast_port = 2003
        # Create a UDP socket for broadcasting
        self.broadcast_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.broadcast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.broadcast_socket.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        # Bind the broadcast socket to the broadcast port
        self.broadcast_socket.bind(('', self.broadcast_port))

        self.rel_port = 2005
        self.rel_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.rel_socket.bind(('', self.rel_port))

        self.connection_port = 2006
        self.connection_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.connection_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.connection_socket.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        self.connection_socket.bind(('', self.connection_port))

    def broadcastsend(self):

        while True:
            #with self.lock1:
            try:
                while self.suspend_threads:
                    with self.condition:
                        self.condition.wait()
                print('entered broadcastsend')
             # Send the broadcast message
                self.broadcast_address = '<broadcast>'
                self.broadcast_message = self.user_name
                self.broadcast_socket.sendto(self.broadcast_message.encode(), (self.broadcast_address, self.broadcast_port))
                # print("Broadcast message sent. Waiting for server responses...")
                time.sleep(2)

            except ConnectionResetError as e:
                break
            except Exception:
                pass

    def updating_servers(self, start_time, opp_name, server_ip):
        """
        process_data = True
        offline_list = []
        countdown = time.time() - start_time
        while countdown < 12:
            offline_list.append(opp_name)
            process_data = False
            break
        print('countdown is :')
        print(countdown)
        print('offline_list is :')
        for items in offline_list:
            print(items)
        print('these are all the items')
        if not process_data:
            if len(offline_list) == 0:
                self.server_addresses.clear()
                print('case1')
            else:
                missing_item = [item for item in self.server_names if item not in offline_list]
                self.server_addresses = {key: value for key, value in self.server_addresses.items() if value not in missing_item}

                print('missing items is')
                print(missing_item)
                print('final dictionary is ')
                print(self.server_addresses)
                start_time = time.time()
                offline_list.clear()
                print('case2')
            """
        if opp_name != self.user_name and opp_name not in self.server_addresses.keys() and opp_name != '':
            self.server_addresses[server_ip] = opp_name
            self.server_names = list(self.server_addresses.values())

        for key, value in self.server_addresses.items():
            print(key, value)
        return start_time
    def broadcastrecieve(self):
        #response_socket.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, buffer_size)
        start_time = time.time()
        #response_socket.settimeout(1)#doesn't recieve anything after 1 second timeout error
        while True:
            #with self.lock1:
            try:
                print('Entered lock2 -> broadcast recieve')
                while self.suspend_threads:
                    with self.condition:
                        self.condition.wait()
                print('entered broadcastrecieve')
                # Receive the response message
                #process the list to find a client stopped sending coordinates
                data, address = self.rel_socket.recvfrom(8192)
                server_ip = address[0]
                # print(address[0])
                opp_name = data.decode()
                start_time = self.updating_servers(start_time, opp_name, server_ip)


            except ConnectionResetError as e:
                break

            except Exception:
                pass



    def get_key_from_value(self, dictionary, value):
        for key, val in dictionary.items():
            if val == value:
                return key
        return None  # Value not found in the dictionary

    def send_server_req(self):
        #if needed use while loop

        connection_message = 'connect'
        host = self.get_key_from_value(self.server_addresses, self.gui_server_name)
        while True:
            try:
                s = self.connection_socket.sendto(connection_message.encode(), (host, self.connection_port))
                if s > 0:
                    print('sent connection request to server! ')
                    time.sleep(2)
            except ConnectionResetError as e:
                break
            except Exception:
                pass
    def client(self):
        only_one_thread_needs_to_be_made = False
        thread1 = threading.Thread(target=self.broadcastsend)
        thread1.daemon = True
        thread1.start()

        thread2 = threading.Thread(target=self.broadcastrecieve)
        thread2.daemon = True
        thread2.start()


        while True:
            try:
                while True:
                    #with self.lock3:
                    try:
                        if self.gui_server_name != '':
                            self.suspend_threads = True
                            print('gui server name is not empty')
                            if not only_one_thread_needs_to_be_made:
                                thread3 = threading.Thread(target=self.send_server_req)
                                thread3.daemon = True
                                thread3.start()
                                only_one_thread_needs_to_be_made = True
                                #self.client()

                            print(self.gui_server_name + ' selected')
                            recieve_port = 2017
                            recieve_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                            recieve_socket.bind(('', recieve_port))
                            data, address = recieve_socket.recvfrom(8192)
                            status = data.decode()
                            host = self.get_key_from_value(self.server_addresses, self.gui_server_name)
                            if (status == 'accepted'):
                                #game.client_program(self.gui_server_name)
                                print('starting game')
                                recieve_socket.close()
                                self.connection_socket.close()
                                self.broadcast_socket.close()
                                self.rel_socket.close()
                                ball_test_client.client_program(self.user_name,self.gui_server_name, host)
                                break
                            if status == 'not_online_anymore':
                                print('server rejected you')
                                self.suspend_threads = False
                                with self.condition:
                                    self.condition.notify_all()
                                host = self.get_key_from_value(self.server_addresses, self.gui_server_name)
                                del self.server_addresses[host]
                                self.gui_server_name = ''
                                break

                    except ConnectionRefusedError:
                        print("Connection refused by the server")
                        #self.suspend_threads = True
                        #with lock:
                        #with self.condition:
                            #self.condition.notify_all()

                if status == 'accepted':
                    break

            except:
                break

"""
                    thread3 = threading.Thread(target=self.handle_client_connection)
                    thread3.daemon = True
                    thread3.start()
                    self.suspendThreads = True
                    self.lock.acquire()
                    """



