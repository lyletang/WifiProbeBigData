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

class IntoStoreRate(object):
	def __init__(self, range_list):
		self.range_list = range_list
		#self.into_store_amount = Counter()
		#self.total = Counter()
		self.into_store_amount = 0
		self.total = 0
		self.into_store_rate = 0
		self.INTO_RANGE = 50

	def __str__(self):
		return '功能：统计入店率\n所需数据结构：range_list'

	__repr__ = __str__
	
	def get_value(self):
		for i in self.range_list:
			for j in i:
				self.total += 1

				if float(j) < self.INTO_RANGE:
					self.into_store_amount += 1
				else:
					pass
	
		#self.into_store_rate = self.into_store_amount.value / self.total.value
		self.into_store_rate = self.into_store_amount / float(self.total)

	def print_value(self):
		print self.into_store_rate

	def return_value(self):
		return self.into_store_rate
