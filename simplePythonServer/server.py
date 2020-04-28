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
import random
import hashlib
import datetime
import errno
import socket

ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

PORT = 8080

"""
Codes:
200 success
201 user already exists
202 added person
401 uuid not found
402 group not found
404 error in understanding request
"""
class Handler (BaseHTTPRequestHandler) :
	def do_OPTIONS(self):
		self.send_response(200, "ok")
		self.send_header('Access-Control-Allow-Origin', '*')
		self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
		self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
		self.send_header("Access-Control-Allow-Headers", "Content-Type")
		self.end_headers()

	def do_GET(self) :
		print(self.path)
		# Look for main page
		if self.path=="/":
			self.path="/index.html"

		if self.path == "/getgroups" or self.path == "/getgroups/":
			#creds = db.check_credentials(self.headers.getheader('X-User-ID'), self.headers.getheader('X-User-Email'),
			#	self.headers.getheader('X-User-Pass'))
			creds= {'uuid': 'test'}
			par = urlparse.parse_qs(urlparse.urlparse(self.path).query)
			if creds is not None:
				self.send_response(200)
				#send headers:
				self.send_header("Content-type:", "application/json")
				# send a blank line to end headers:
				self.wfile.write("\n")
				#send response:
				json.dump(db.getGroups(creds['uuid']), self.wfile)
				self.end_headers
				return
			else:
				self.send_response(404)
				return
		if self.path.split('?')[0] == "/getgroup":
			creds= {'uuid': 'test'}
			par = urlparse.parse_qs(urlparse.urlparse(self.path).query)
			if creds is not None:
				self.send_response(200)
				self.send_header("Content-type:", "application/json")
				self.wfile.write("\n")
				json.dump(db.getGroup(par['id'][0]), self.wfile)
				self.end_headers
				return
			else:
				self.send_response(404)
				return
		# if self.path == "/login" or self.path == "/login/":
		# 	print("connection made /login")
		# 	creds = db.check_credentials(self.headers.getheader('X-User-ID'),
		# 		self.headers.getheader('X-User-Email'), self.headers.getheader('X-User-Pass'))
		# 	if creds is not None:
		# 		self.send_response(200)
		# 		self.send_header("Content-type:", "application/json")
		# 		self.wfile.write("\n")
		# 		json.dump(creds,self.wfile)
		# 		self.end_headers()
		# 		return

		# 	self.send_response(401)
		# 	self.end_headers()


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
	def gensalt(self):
		chars=[]
		return ''.join(random.choice(ALPHABET) for i in range(16))


	def do_POST(self):
		# Look for POST request
		if self.path == "/creategroup" or self.path == "/creategroup/":
			creds = db.check_credentials(self.headers.getheader('X-User-ID'),
				self.headers.getheader('X-User-Email'), self.headers.getheader('X-User-Pass'))

			if creds is not None:
				postvars = self.parse_POST()
				newGroup = db.addGroup(postvars["groupname"],creds)
				if newGroup["success"]:
					json.dump(newGroup ,self.wfile)
				else:
					json.dump({"message": "Group name already exists","approved":False},self.wfile)
				self.end_headers()
				return
			self.send_response(404)
			self.end_headers()

		if self.path == "/addperson" or self.path == "/addperson/":
			#creds = db.check_credentials(self.headers.getheader('X-User-ID'),
			#	self.headers.getheader('X-User-Email'), self.headers.getheader('X-User-Pass'))
			creds= {'uuid': 'test'}
			if creds is not None:
				postvars = self.parse_POST()
				newPerson = db.add_person(postvars)
				print(newPerson)
				self.send_response(200)
				return
				newPerson = db.add_person(postvars)
				if newPerson["success"]:
					self.send_response(200)
					#self.wfile.write("\n")
					#json.dump(newPerson ,self.wfile)
				else:
					self.send_response(400)
					#json.dump({"message": "Error adding person","approved":False},self.wfile)
				self.end_headers()
				return
			self.send_response(404)
			self.end_headers()


		if self.path == "/register" or self.path == "/register/":
			postvars = self.parse_POST()
			salt = self.gensalt()
			passw = salt +postvars['X-User-Pass']
			passSec = hashlib.sha224(passw).hexdigest()
			uuid=db.generate_uuid()
			info = db.registerUser(postvars,passSec,salt,uuid)
			#info = {"success":True, "message":"added user","uuid":"random1234", "email":postvars['X-User-Email']}
			if info["success"]:
				self.send_response(200)
			else:
				self.send_response(201)
			self.wfile.write("\n")
			json.dump(info,self.wfile)
			self.end_headers()
			return


	def do_PUT(self):
		if self.path == "/updateperson" or self.path == "/updateperson/":
			#creds = db.check_credentials(self.headers.getheader('X-User-ID'),
			#	self.headers.getheader('X-User-Email'), self.headers.getheader('X-User-Pass'))
			creds= {'uuid': 'test'}
			try:
				if creds is not None:
					postvars = self.parse_POST()
					dbupdate = db.update_person(postvars,creds)

					if dbupdate:
						self.wfile.write("\n")
						print("update response")
						self.send_response(200)
						#json.dump({"message": "worked","success":True} ,self.wfile)
					else:
						self.send_response(201)
						self.wfile.write("\n")
						json.dump({"message": "Error updating","approved":False},self.wfile)

					self.end_headers()
					return
				self.send_response(404)
				self.end_headers()
			except socket.error as e:
				if e.errno != errno.EPIPE:
					# Not a broken pipe
					raise
				print("***********pipe************")
				self.send_response(404)
				self.end_headers()

	def do_DELETE(self):
		if self.path.split('?')[0] == "/deleteperson":
			creds= {'uuid': 'test'}
			par = urlparse.parse_qs(urlparse.urlparse(self.path).query)
			print("par",par)
			status = db.delete_person(par,creds)
			self.send_response(status)
			self.end_headers()

server = HTTPServer(("localhost", PORT), Handler)
print ("serving at port", PORT)
server.serve_forever()
