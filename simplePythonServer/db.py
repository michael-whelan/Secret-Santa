import sqlite3
import uuid
import datetime
import hashlib


def generate_uuid():
	return uuid.uuid4().hex

def uniqueEntry(email):
	conn = sqlite3.connect('secretsanta.db')
	query = "SELECT email from users where email = '%s'" % email
	cursor = conn.execute(query)
	data = cursor.fetchall()
	if not data:
		return True
	else:
		return False

def days_between(d1, d2):
    d1 = datetime.datetime.strptime(d1, "%Y-%m-%d")
    d2 = datetime.datetime.strptime(d2, "%Y-%m-%d")
    return abs((d2 - d1).days)

def check_credentials(uuid,email,passw):
	nowTime = '{:%Y-%m-%d}'.format(datetime.datetime.now())
	getUser(None,email,passw)

	print(days_between("2019-02-12",nowTime))
	return None
	uuid = self.headers.getheader('X-User-ID')
	nowTime = '{:%Y-%m-%d}'.format(datetime.datetime.now())
	print("uuid",uuid)
	if uuid == "random1234":
		return True
	name = self.headers.getheader('X-User-Email')
	password = self.headers.getheader('X-User-Pass')
	if name =="michael@g.c" and password == "qwert":
		return True
	return False

def registerUser(deets,secure,salt, uuid):
	nowTime = '{:%Y-%m-%d}'.format(datetime.datetime.now())
	if uniqueEntry(deets['X-User-Email']):
		query = "insert into users(first_name, last_name,email,uuid,pass,salt,uuid_date) values ('%s','%s','%s','%s','%s','%s','%s');" %(
			deets['X-User-First'],deets['X-User-Last'],deets['X-User-Email'],uuid,secure,salt,nowTime
		)
		conn = sqlite3.connect('secretsanta.db')
		cursor = conn.execute(query)
		print(query)
		return {"uuid":uuid,"success":True,"message":"New Account created"}
	return {"message": "Email account already exists","success":False}

def getUser(u,e,recpass):
	query= ""
	conn = sqlite3.connect('secretsanta.db')
	if u is not None:
		query = "SELECT * from users where uuid = %s" % (u)
		print(query)
		cursor = conn.execute(query)
		if cursor == None:
			return False
	else:
		query = "SELECT * from users where email = '%s'" % (e)
		print(query)
		cursor = conn.execute(query)
		if cursor == None:
			return False
		rows = [x for x in cursor]
		cols = [x[0] for x in cursor.description]
		data = []
		for row in rows:
			entry = {}
			for prop, val in zip(cols, row):
				entry[prop] = val
				data.append(entry)
		print(data[0])
		#newPass= data[0]['salt'] +recpass
		#passSec = hashlib.sha224(newPass).hexdigest()
		#print("pass check",passSec,data[0]['pass'])
		#if(passSec == data[0]['pass']):
		#	return data[0].uuid

		return False
	print ("Operation done successfully")
	conn.close()

	#return data

def getGroups(p):
	data =groups
	print ("Operation done successfully")
	return data

def addGroup(groupName):
	for group in groups:
		if groupName == groups[group]["name"]:
			return False
	return True

def putOne(name,datetime,msg):
	conn = sqlite3.connect('birdy.db')
	c = conn.cursor()
	c.execute("INSERT INTO chirps (user, datetime, msg) VALUES(?,?,?)", (name,datetime,msg))
	#num = c.execute("SELECT id FROM clients ORDER BY id DESC LIMIT 1")
	conn.commit()
	#rows = [x for x in num]
	#print ("Operation done successfully "+str(rows[0][0]));
	c.close()
	conn.close()
	return


groups= {
		"id0001": {
			"name":"group1",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		},
		"id0002": {
			"name":"group2",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		},
		"id0003": {
			"name":"group3",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		},
		"id0004": {
			"name":"group4",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		},
		"id0005": {
			"name":"group5",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		},
		"id0006": {
			"name":"group6",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		},
		"id0007": {
			"name":"group7",
			"0": {"name":"Test Person1","email":"Test1@test.com", "not":[]},
			"1": {"name":"Test Person2","email":"Test2@test.com", "not":[]},
			"2": {"name":"Test Person3","email":"Test3@test.com", "not":[]},
			"3": {"name":"Test Person4","email":"Test4@test.com", "not":[]},
			"4": {"name":"Test Person5","email":"Test5@test.com", "not":[]}
		}
	}