import sys
import copy
import os
import json
from pprint import pprint
import re
import random
import copy
from random import shuffle




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




user1 = Person('user1','user1@gmail.com')
user2 = Person('user2','user2@gmail.com')
user3 = Person('user3','user3@gmail.com')
user4 = Person('user4','user4@gmail.com')
user5 = Person('user5','user5@gmail.com')
user6 = Person('user6','user6@gmail.com')
user7 = Person('user7','user7@gmail.com')
user8 = Person('user8','user8@gmail.com')
user9 = Person('user9','user9@gmail.com')


taken = []


usersG = [
	user1,
	user2,
	user3,
	user4,
	user5,
	user6,
	user7,
	user8,
	user9 	
]

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
		if not loopUsers():
			fails+=1
			fillTest()
			#	import pdb; pdb.set_trace()
		else:
			success=True
	print('success:', success)
	print('fails:', fails)

				
def loopUsers():
	remaining = usersG[:]
	try:
		for user in usersG:
			remaining.remove(user.collect(remaining))
			#print(user.name,user.chosen.name)
			if user.chosen == False:
				return False
		return True
	except Exception as error:
		#print(error)
		#import pdb; pdb.set_trace()
		return False
		
		
if __name__ == "__main__":
	main()