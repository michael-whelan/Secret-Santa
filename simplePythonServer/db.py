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
	print("checkcreds",uuid,email,passw)
	nowTime = '{:%Y-%m-%d}'.format(datetime.datetime.now())
	newUUID = uuid
	#if days_between("2019-02-12",nowTime) > 0:
	#	newUUID=generate_uuid()

	#retrieve info from DB
	userInfo = getUser(uuid,email,passw)
	if userInfo is None:
		return None
	#get sent info from client
	nowTime = '{:%Y-%m-%d}'.format(datetime.datetime.now())
	if uuid is not None:
		if days_between(userInfo["uuid_date"],nowTime) < 1:
			return {"uuid":uuid,"email":userInfo["email"]}
			#newUUID=generate_uuid()
		return None
	#if not logging in via UUID salt the password and hash
	passl = userInfo["salt"] +passw
	passSec = hashlib.sha224(passl).hexdigest()
	print("loging check", passSec)
	print("loging check", 	userInfo["pass"])
	if email == userInfo["email"] and passSec == userInfo["pass"]:
		if days_between(userInfo["uuid_date"],nowTime) >= 1:
			newUUID=generate_uuid()
			update_uuid(userInfo["id"],newUUID)
		return {"uuid":userInfo["uuid"],"email":userInfo["email"]}
	return None


def update_uuid(userId, uuid):
	query = "Update users set uuid='%s' where id = '%s'" % (uuid,userId)
	conn = sqlite3.connect('secretsanta.db')
	cursor= conn.cursor()
	cursor.execute(query)
	conn.commit()


def registerUser(deets,secure,salt, uuid):
	print("salt",salt)
	nowTime = '{:%Y-%m-%d}'.format(datetime.datetime.now())
	if uniqueEntry(deets['X-User-Email']):
		query = "insert into users(first_name, last_name,email,uuid,pass,salt,uuid_date) values ('%s','%s','%s','%s','%s','%s','%s');" %(
			deets['X-User-First'],deets['X-User-Last'],deets['X-User-Email'],uuid,secure,salt,nowTime
		)
		conn = sqlite3.connect('secretsanta.db')
		cursor= conn.cursor()
		cursor.execute(query)
		conn.commit()
		return {"uuid":uuid,"success":True,"message":"New Account created"}
	return {"message": "Email account already exists","success":False}

def getUser(u,e,recpass):
	query= ""
	conn = sqlite3.connect('secretsanta.db')
	if u is not None:
		query = "SELECT * from users where uuid = '%s'" % (u)
		print(query)
	else:
		query = "SELECT * from users where email = '%s'" % (e)
	print(query)
	cursor = conn.execute(query)
	if cursor == None:
		return None
	rows = [x for x in cursor]
	cols = [x[0] for x in cursor.description]
	data = {}
	for row in rows:
		for prop, val in zip(cols, row):
			data[prop] = val
	print ("Operation done successfully")
	conn.close()

	return data

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