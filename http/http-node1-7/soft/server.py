#!/usr/bin/python
#-*-coding:utf-8 -*-

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

from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
import redis
import json
import re


class TestHTTPHandle(BaseHTTPRequestHandler):
	def do_POST(self):
		channel = 'wifi'
                host = '192.168.1.18'
                port = 6379
		self.r = redis.Redis(host = host, port = port)
		self.protocal_version = 'HTTP/1.1'
		lines = self.rfile.read(int(self.headers['content-length'])).strip().split('=')[1]
		self.r.publish(channel, lines)
		print lines


http_server = HTTPServer(('', 9999), TestHTTPHandle)  
http_server.serve_forever()

