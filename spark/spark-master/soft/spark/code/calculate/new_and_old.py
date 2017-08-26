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

class NewAndOld(object):
	def __init__(self, resident_list):
		self.resident_list = resident_list
		#self.new = Counter()
		#self.old = Counter()
		self.new = 0
		self.old = 0

	def __str__(self):
		return '功能：统计新老顾客量\n所需数据结构：mac_info_list'

	__repr__ = __str__
	
	def get_value(self):
		'''
		for i in self.resident_list:
			if i[2] <= 1:
				#self.new.add(1)
				self.new += 1
			elif i[2] > 1:
				#self.old.add(1)
				self.old += 1
			else:
				raise ValueError
		'''

		for index, key in enumerate(self.resident_list):
			if self.resident_list[key][-1] == 1:
				self.new += 1
			elif self.resident_list[key][-1] > 1:
				self.old += 1
			else:
				raise ValueError

	def print_value(self):
		print self.new, self.old
