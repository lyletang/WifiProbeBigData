# -*- coding: utf-8 -*-
# filename: main.py

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

import web
from handle import Handle

urls = (
    '/wx', 'Handle',
)

if __name__ == '__main__':
    app = web.application(urls, globals())
    app.run()
