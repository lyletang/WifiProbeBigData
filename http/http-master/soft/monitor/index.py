#!/use/bin/python
#coding: utf-8

# Monitoring of the Probe and Server cluster

'''
Match: 2017 China Software Cup
Topic: Commercial large data analysis technology based on WIFI probe.
School: CCUT(Changchun University Of Technology)
Date: 2017.03 - 2017-06
Team: teamName   --- Victors
	  teamLeader --- Jiahui Tang
	  teamMember --- Pengyue Zhao
	  teamMember --- Xinguang Guo
'''

import time, datetime
import os
import sys
import json

class Monitor(object):
	def __init__(self):
		self.config_file = 'config.json'

		self.ip_dic_probe = {}
		self.ip_dic_http = {}
		self.ip_dic_elk = {}
		self.ip_dic_spark = {}
		self.ip_dic_web = {}
		self.ip_wechat = {}
		self.ip_sms = {}
		
		self.ip_temp = {}
		self.status_dic_probe = {}
		self.status_dic_http = {}
		self.status_dic_elk = {}
		self.status_dic_spark = {}
		self.status_dic_web = {}
		self.status_wechat = {}
		self.status_sms = {}

		self.status_dic = {}

	def __str__(self):
		return 'Moitoring of the Server cluster'
		'''
		0 means ping the IP of Server_pi successfully.
		else means ping the IP of Server_pi failure.
		'''

	__repr__ = __str__

	def get_ip(self):
		#get (the serial number/IP) of Server cluster from the json
		f = file(self.config_file)
		s = json.load(f)
		
		self.ip_dic_probe = s['probe']
		self.ip_dic_http = s['tcp']
		self.ip_dic_elk = s['elk']
		self.ip_dic_spark = s['spark']
		self.ip_dic_web = s['web']
		self.ip_wechat = s['wechat']
		self.ip_sms = s['sms']

	def monitor(self):
		try:
			'''
			for index, serial_num in enumerate(self.ip_dic):
				cmd = 'ping -c 1 -W 1 -v {ip_address}'.format(ip_address = self.ip_dic[serial_num])
				result = os.system(cmd)	
				
				if result == 0:
					self.status_temp = {serial_num: True}
					self.status_dic.update(self.status_temp)
				else:
					self.status_temp = {serial_num: False}
					self.status_dic.update(self.status_temp)
			'''
			
			for i in [self.ip_dic_probe, self.ip_dic_http, self.ip_dic_elk, self.ip_dic_spark, self.ip_dic_web]:
				if i == self.ip_dic_probe:
					name = 'probe'
				elif i == self.ip_dic_http:
					name = 'tcp'
				elif i == self.ip_dic_elk:
					name = 'elk'
				elif i == self.ip_dic_spark:
					name = 'spark'
				elif i == self.ip_dic_web:
					name = 'web'
				else:
					pass

				for index, serial_num in enumerate(i):
					cmd = 'ping -c 1 -W 1 -v {ip_address}'.format(ip_address = i[serial_num])
					result = os.system(cmd)	
				
					tempDic = {'probe': self.status_dic_probe,\
							   'tcp': self.status_dic_http,\
							   'elk': self.status_dic_elk,\
							   'spark': self.status_dic_spark,\
							   'web': self.status_dic_web\
							   }

					if result == 0:
						self.status_temp = {serial_num: True}
						tempDic[name].update(self.status_temp)
					else:
						self.status_temp = {serial_num: False}
						tempDic[name].update(self.status_temp)
					
					self.status_dic.update({name: tempDic[name]})
						
			cmd = 'ping -c 1 -W 1 -v {ip_address}'.format(ip_address = self.ip_wechat)
			result = os.system(cmd)	
				
			if result == 0:
				self.status_temp = {'wechat': True}
				self.status_dic.update(self.status_temp)
			else:
				self.status_temp = {'wechat': False}
				self.status_dic.update(self.status_temp)
			
			cmd = 'ping -c 1 -W 1 -v {ip_address}'.format(ip_address = self.ip_sms)
			result = os.system(cmd)	
				
			if result == 0:
				self.status_temp = {'sms': True}
				self.status_dic.update(self.status_temp)
			else:
				self.status_temp = {'sms': False}
				self.status_dic.update(self.status_temp)


		except Exception,e:
			print e

	def send(self):
		print self.status_dic
		status_file = open('status.json', 'w')
		json.dump(self.status_dic, status_file)
		status_file.close()
		
		file_path = 'status.json'
		cmd1 = 'scp ' + file_path + ' pi@192.168.1.250:~/Monitor/'
		cmd2 = 'scp ' + file_path + ' pi@192.168.1.251:~/Monitor/'
		cmd3 = 'scp ' + file_path + ' pi@192.168.1.252:~/Monitor/'
		os.system(cmd1)
		os.system(cmd2)
		os.system(cmd3)
		
def main():
	while True:
		print '\n[INFO]: This round of monitoring start!\n'

		monitor = Monitor()
		monitor.get_ip()
		monitor.monitor()
		monitor.send()

		print '\n[INFO]: This round of monitoring end!\n'

		time.sleep(1)

if __name__ == '__main__':
	main()
