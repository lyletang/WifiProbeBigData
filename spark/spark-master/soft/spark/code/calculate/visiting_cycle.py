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

class VisitingCycle(object):
	def __init__(self, interval_ave_list):
		self.interval_ave_list = interval_ave_list	
		#self.temp = Counter()
		self.time = 0
		#self.num= 0
		self.visiting_cycle = 0
		
		#base hour
		#self.TIME = 1 / 24.0

	def __str__(self):
		return '功能: 统计来访周期\n所需数据结构：mac_info_list'

	__repr__ = __str__
	
	def get_value(self):
		for index, key in enumerate(self.interval_ave_list):
				self.time += self.interval_ave_list[key]

		self.visiting_cycle = self.time / float(len(self.interval_ave_list.items()))

	def print_value(self):
		print self.visiting_cycle

	def return_value(self):
		return self.visiting_cycle

'''
class VisitingCycleDay(VisitingCycle):
	def __init__(self, mac_info_list):
		self.mac_info_list = mac_info_list	
		#self.temp = Counter()
		self.temp = 0
		self.visiting_cycle = 0
		
		#base day
		self.TIME = 1.0

class VisitingCycleWeek(VisitingCycle):
	def __init__(self, mac_info_list):
		self.mac_info_list = mac_info_list	
		#self.temp = Counter()
		self.temp = 0
		self.visiting_cycle = 0
		
		#base week
		self.TIME = 7.0

class VisitingCycleMonth(VisitingCycle):
	def __init__(self, mac_info_list):
		self.mac_info_list = mac_info_list	
		#self.temp = Counter()
		self.temp = 0
		self.visiting_cycle = 0
		
		#base month
		self.TIME = 30.0
'''
