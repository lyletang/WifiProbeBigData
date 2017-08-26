#!/usr/bin/python
#-*-coding:UTF-8-*-

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

import datetime
import elasticsearch
import time as ti

class hebin:
	def __init__(self):
		sel.es = elasticsearch.Elasticsearch([{'host': '192.168.1.100', 'port': 9200}])
#		time = datetime.datetime.now()
		self._time = datetime.datetime.now()
		print 'start:', self._time
	def clear(self, time):
		clear_time = time.strftime('%Y-%m-%dT%H:%M:%S')
		index = time.strftime('sou-%Y.%m.%d_%H')
		if self.es.indices.exists(index = index):
			#huo qu json
			match = {'query':{'range':{'@timestamp': {'gte': clear_time, 'lte': clear_time}}}}
			count = self.es.count(index = index, doc_type = 'logs', body = match)
			if count['count'] > 1:
				print clear_time
				print clear_time+':',str(count['count'])
				json = self.es.search(index = index , doc_type = 'logs' , size = count['count'] , body = match)['hits']['hits']
				#huo qu first mac list
				mac_list = [x['mac'] for x in json[0]['_source']['data']]
				_id = json[0]['_id']
				print 'first len mac', len(mac_list)
				#delete first json
				self.es.delete(index = index , doc_type = 'logs' , id = _id)


				#clear
				for i in range(1,count['count']):
					_id = json[i]['_id']
					for mac in json[i]['_source']['data']:
						if mac['mac'] not in mac_list:
							json[0]['_source']['data'].append(mac)
					self.es.delete(index = index , doc_type = 'logs',id = _id)
				#insert new json
				self.es.index(index = index , doc_type = 'logs' , body = json[0]['_source'])
				print 'finish len mac',len(json[0]['_source']['data'])
				return True
			else:
				return False
	def main(self):
		for i in range(3600):
			self.clear(self._time)
			self._time += datetime.timedelta(seconds=1)
		print 'finish', self._time

if __name__ == '__main__':
#	while datetime.datetime.now().minute == 0 :
	start = ti.time()
	clear = hebin()
	clear.main()
	end = ti.time()
	print '用时： ' + str(end-start) + 's'
