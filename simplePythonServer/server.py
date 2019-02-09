#!/usr/bin/python
# coding=utf-8

from BaseHTTPServer import HTTPServer
from BaseHTTPServer import BaseHTTPRequestHandler
import os
from os import curdir, sep
import json
import re
import db
import codecs
import cgi
import urlparse
from flask import Flask, jsonify, abort, request, make_response, url_for, render_template, redirect




PORT = 8080

class Handler (BaseHTTPRequestHandler) :
	def do_OPTIONS(self):
		self.send_response(200, "ok")
		self.send_header('Access-Control-Allow-Origin', '*')
		self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
		self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
		self.send_header("Access-Control-Allow-Headers", "Content-Type")
		self.end_headers()


	def check_credentials(self):
		uuid = self.headers.getheader('X-User-ID')
		print ("uuid", uuid)
		if uuid == "random1234":
			return True
		name = self.headers.getheader('X-User-Name')
		password = self.headers.getheader('X-User-Pass')
		if name =="michael@g.c" and password == "qwert":
			return True
		return False


	def do_GET(self) :
		# Look for main page
		if self.path=="/":
			self.path="/index.html"

		if self.path == "/getstuff" or self.path == "/getstuff/":
			#send response code:
			print("connection made")
			if self.check_credentials():
				self.send_response(200)
				#send headers:
				self.send_header("Content-type:", "application/json")
				# send a blank line to end headers:
				self.wfile.write("\n")
				#send response:
				json.dump(db.getGroups(self.path), self.wfile)
				self.end_headers
				return
			else:
				self.send_response(404)
				return
		if self.path == "/login" or self.path == "/login/":
			if self.check_credentials():
				self.send_response(200)
				self.send_header("Content-type:", "application/json")
				self.wfile.write("\n")
				json.dump({"uuid": "random1234"},self.wfile)
				self.end_headers()
				return

			# Send code 200
			#self.response.out.write()
			self.send_response(404)
			self.end_headers()

		try:
			#Check the file extension required and
			#set the right mime type
			sendReply = False
			if self.path.endswith(".html"):
				mimetype='text/html'
				sendReply = True
			if self.path.endswith(".woff"):
				mimetype='font/opentype'
				sendReply = True
			if self.path.endswith(".ttf"):
				mimetype='font/opentype'
				sendReply = True
			if self.path.endswith(".js"):
				mimetype='application/javascript'
				sendReply = True
			if self.path.endswith(".css"):
				mimetype='text/css'
				sendReply = True

			if sendReply == True:
				#Open the static file requested and send it
				f = open(curdir + sep + self.path)
				self.send_response(200)
				self.send_header('Content-type',mimetype)
				self.end_headers()
				self.wfile.write(f.read())
				f.close()

			return

		except IOError:
			self.send_error(404,'File Not Found: %s' % self.path)

	def parse_POST(self):
		length = int(self.headers.getheader('content-length'))
		# Get form data
		postvars = urlparse.parse_qs(self.rfile.read(length), keep_blank_values=1)
		newJson ={}
		for k in postvars:
			v = json.loads(k)
			for key in v:
				newJson[key] = v[key]
		return newJson

	def do_POST(self):
		# Look for POST request
		if self.path == "/creategroup" or self.path == "/creategroup/":
			if self.check_credentials():
				postvars = self.parse_POST()

				if db.addGroup(postvars["groupname"]):
					json.dump({"message": "Group added: "+postvars["groupname"],"approved":True},self.wfile)
				else:
					json.dump({"message": "Group name already exists","approved":False},self.wfile)
				self.end_headers()
				return

			# Send code 200
			#self.response.out.write()
			self.send_response(404)
			self.end_headers()

server = HTTPServer(("localhost", PORT), Handler)
print ("serving at port", PORT)
server.serve_forever()
