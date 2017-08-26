#coding: utf-8

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

import sys
#sys.path.append('../')

#from base import Counter

class TrafficAmount(object):
	def __init__(self, mac_list):
		self.mac_list = mac_list
		#self.traffic_amount = Counter()
		self.traffic_amount = 0	
	
	def __str__(self):
		return '功能：统计客流量\n所需数据结构：mac_list'

	__repr__ = __str__


	def get_value(self):
		for i in self.mac_list:
			#self.traffic_amount.add(len(i))
			self.traffic_amount += len(i)

	def print_value(self):
		#print self.traffic_amount.value
		print self.traffic_amount

	def return_value(self):
		return self.traffic_amount
