import sqlite3
import uuid
import datetime
import hashlib


def generate_uuid():
	return uuid.uuid4().hex

def uniqueEntry(q):
	conn = sqlite3.connect('secretsanta.db')
	#query = "SELECT %s from %s where %s = '%s'" % (sel, tbl,sel,email)
	cursor = conn.execute(q)
	data = cursor.fetchall()
	conn.close()
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
	newUUID = uuid

	#retrieve info from DB
	userInfo = getUser(uuid,email,passw)
	print(userInfo)
	if userInfo is None or userInfo == {}:
		return None
	#get sent info from client
	if uuid is not None:
		if days_between(userInfo["uuid_date"],nowTime) < 1:
			return {"uuid":uuid,"email":userInfo["email"]}
			#newUUID=generate_uuid()
		return None
	#if not logging in via UUID salt the password and hash
	passl = userInfo["salt"] +passw
	passSec = hashlib.sha224(passl).hexdigest()
	if email == userInfo["email"] and passSec == userInfo["pass"]:
		if days_between(userInfo["uuid_date"],nowTime) >= 1:
			newUUID=generate_uuid()
			update_uuid(userInfo["id"],newUUID, nowTime)
		else:
			newUUID = userInfo["uuid"]
		return {"uuid":newUUID,"email":userInfo["email"]}
	return None


def update_uuid(userId, uuid,curDate):
	query = "Update users set uuid='%s',uuid_date='%s' where id = '%s'" % (uuid,curDate,userId)
	conn = sqlite3.connect('secretsanta.db')
	cursor= conn.cursor()
	cursor.execute(query)
	conn.commit()
	conn.close()


def registerUser(deets,secure,salt, uuid):
	print("salt",salt)
	nowTime = '{:%Y-%m-%d}'.format(datetime.datetime.now())
	#if uniqueEntry("email", "users", deets['X-User-Email']):
	if uniqueEntry("SELECT * from users where email = '%s'" % (deets['X-User-Email'])):
		query = "insert into users(first_name, last_name,email,uuid,pass,salt,uuid_date) values ('%s','%s','%s','%s','%s','%s','%s');" %(
			deets['X-User-First'],deets['X-User-Last'],deets['X-User-Email'],uuid,secure,salt,nowTime
		)
		conn = sqlite3.connect('secretsanta.db')
		cursor= conn.cursor()
		cursor.execute(query)
		conn.commit()
		conn.close()
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

def getGroups(uuid):
	data =groups
	#query = """SELECT * from groups where admin = (select id from users where uuid = '%s');""" % (uuid)
	query = """SELECT g.id,g.group_name,g.sent,p.name,p.email,p.active from groups g inner join
	people p where g.id = p.group_id and g.admin = (select id from users where uuid = '%s') order by p.group_id;""" % (uuid)
	print(query)
	conn = sqlite3.connect('secretsanta.db')
	cursor= conn.cursor()
	cursor.execute(query)
	if cursor == None:
		return None
	rows = [x for x in cursor]
	cols = [x[0] for x in cursor.description]
	data = []
	for row in rows:
		dataSingle = {}
		print("row",row)
		for prop, val in zip(cols, row):
			dataSingle[prop] = val
		data.append(dataSingle)
	conn.close()
	print ("Operation done successfully")
	print(data)
	return None
	return data

def addGroup(groupName, userInfo):
	if uniqueEntry("""select * from groups where group_name = '%s' and
	admin = (select id from users where uuid = '%s')""" % (groupName, userInfo["uuid"])):
		nowTime = '{:%Y-%m-%d}'.format(datetime.datetime.now())
		query = """insert into groups (group_name,date_created,last_update_date,admin,public,sent)
			values ('%s', '%s', '%s', (select id from users where uuid = '%s'), 0,0);""" % (
				groupName, nowTime,nowTime,userInfo["uuid"]
			)
		conn = sqlite3.connect('secretsanta.db')
		cursor= conn.cursor()
		cursor.execute(query)
		conn.commit()
		new_group_id = cursor.lastrowid
		conn.close()
		return {"group_id":new_group_id,"group_name":groupName,"success":True,"message":"New Group created"}
	return {"message": "Group creation error","success":False}
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