import sys
import copy
import os
import json
from pprint import pprint
import re
import random
import copy
from random import shuffle
import smtplib
from string import Template
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header
from operator import attrgetter


class Person:
	def __init__(self, name, email):
		self.name = name
		self.email = email
		self.not_list =[]
		self.possible_list =[]
		self.chosen=False
	
	def collect(self, users):
		b = users[:]
		self.fillPossible(b)
		if len(self.possible_list) == 0:
			raise ValueError('Ran out of options. Need to reseed')
		return self.choose()
		
	def fillPossible(self, users):
		if self in users:
			users.remove(self)
		for u in users:
			if u not in self.not_list and u not in self.possible_list:
				self.possible_list.append(u)

	def choose(self):
		self.chosen = random.choice(self.possible_list)
		return self.chosen



taken = []


usersG = [
	Person('Michael','seagullmania93@gmail.com'),
	Person('Damo','superdamo@gmail.com'),
	Person('Emma','emmakingham93@gmail.com'),
	Person('Joanna','joannacorscadden@gmail.com'),
	Person('Fiach','fiachw@gmail.com'),
	Person('Sam','samanthaloughrey@hotmail.com'),
	Person('Rach','whelan8395@gmail.com'),
	Person('Jack','jackwhelan01@gmail.com'),
	Person('Sean','seanwhelan117@gmail.com'),
	Person('Aine','ainewhelanphotos@gmail.com')
]

usersG[0].not_list.append(usersG[2])
usersG[2].not_list.append(usersG[0])
usersG[1].not_list.append(usersG[3])
usersG[3].not_list.append(usersG[1])
usersG[4].not_list.append(usersG[5])
usersG[5].not_list.append(usersG[4])

def fillTest():
	for user in usersG:
		user.not_list=[]
		tempInt =random.randint(1,3)
		while tempInt > 0:
			user.not_list.append(random.choice(usersG))
			tempInt-=1
	

def main():
	fails = 0
	success=False
	fillTest()
	while fails < 1200 and success==False:
		shuffle(usersG)
		usersG.sort(key=lambda s: len(s.not_list), reverse = True)#sort the list so that the largest not list is first
		if not loopUsers():
			fails+=1
			fillTest()
		else:
			success=True
	for user in usersG:
		#print(user.name, user.chosen.name)
		sendMessage(user)
	print('success:', success)
	print('fails:', fails)

				
def loopUsers():
	remaining = usersG[:]
	try:
		for user in usersG:
			remaining.remove(user.collect(remaining))
			if user.chosen == False:
				return False
		return True
	except Exception as error:
		return False
		

def sendMessage(person):
	####smtp_host = 'smtp.live.com'        # microsoft
	smtp_host = 'smtp.gmail.com'       # google
	#smtp_host = 'smtp.mail.yahoo.com'  # yahoo
	login, password = 'santysecrets@gmail.com', 'blitzen123'

	msg = MIMEText("To "+str(person.name)+", \n\nYou're secret santa giftee is "+str(person.chosen.name), 'plain', 'utf-8')
	msg['Subject'] = Header('Secret Santa', 'utf-8')
	msg['From'] = login
	msg['To'] = person.email

	s = smtplib.SMTP(smtp_host, 587, timeout=10)
	s.set_debuglevel(1)
	try:
		s.starttls()
		s.login(login, password)
		s.sendmail(msg['From'], msg['To'], msg.as_string())
	finally:
		s.quit()

if __name__ == "__main__":
	main()
	#sendMessage('santysecrets@gmail.com','seagullmania93@gmail.com')

	