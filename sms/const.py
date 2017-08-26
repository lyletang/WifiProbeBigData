# -*- coding: UTF-8 -*- 
# Filename: const.py 

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

class _const: 
	class ConstError(TypeError):pass 
	
	def __setattr__(self, name, value): 
		if self.__dict__.has_key(name): 
			raise self.ConstError, "Can't rebind const (%s)" %name 
		self.__dict__[name]=value 

import sys 
sys.modules[__name__] = _const()
