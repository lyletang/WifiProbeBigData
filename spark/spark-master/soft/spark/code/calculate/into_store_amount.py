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

class IntoStoreAmount(object):
	def __init__(self, range_list):
		self.range_list = range_list
		#self.into_store_amount = Counter()
		self.into_store_amount = 0
		self.INTO_RANGE = 50

	def __str__(self):
		return '功能：统计入店量\n所需数据结构：range_list'

	__repr__ = __str__
	
	def get_value(self):
		for i in self.range_list:
			for j in i:
				#print j
				#print type(j)
				if float(j) < self.INTO_RANGE:
					#print 'yes'
					#self.into_store_amount.add(1)
					self.into_store_amount += 1
				else:
					#print 'no'
					pass
	
	def print_value(self):
		print self.into_store_amount

	def return_value(self):
		return self.into_store_amount
