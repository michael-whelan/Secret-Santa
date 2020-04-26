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
	print("check_creds")
	nowTime = '{:%Y-%m-%d}'.format(datetime.datetime.now())
	newUUID = uuid

	#retrieve info from DB
	userInfo = getUser(uuid,email,passw)
	if userInfo is None or userInfo == {}:
		return None
	#get sent info from client
	if uuid is not None:
		if days_between(userInfo["uuid_date"],nowTime) < 1:
			print("creds valid")
			return {"uuid":uuid,"email":userInfo["email"]}
			#newUUID=generate_uuid()
		return None
	#if not logging in via UUID salt the password and hash
	passl = userInfo["salt"] +passw
	passSec = hashlib.sha224(passl).hexdigest()
	if email == userInfo["email"] and passSec == userInfo["pass"]:
		print("creds valid")
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
	else:
		query = "SELECT * from users where email = '%s'" % (e)
	cursor = conn.execute(query)
	if cursor == None:
		return None
	rows = [x for x in cursor]
	cols = [x[0] for x in cursor.description]
	data = {}
	for row in rows:
		for prop, val in zip(cols, row):
			data[prop] = val
	
	conn.close()
	print ("getUser done successfully")
	return data



def structure_group(raw_data):
	lastGroup ="null"
	data =[]
	for i in raw_data:
		if i["group_id"] != lastGroup:
			group = {}
			group["group_name"] = i["group_name"]
			group["group_id"] = i["group_id"]
			group["active"] = i["active"]
			group["people"] = []
			lastGroup = i["group_id"]
			data.append(group)
		person = {}
		person["person_id"]= i["person_id"]
		person["name"]= i["name"]
		person["email"]= i["email"]
		person["active"]= i["active"]
		person["nots"]= i["nots"]
		data[(len(data))-1]["people"].append(person)
	return data

def getGroups(uuid):
	#query = """SELECT * from groups where admin = (select id from users where uuid = '%s');""" % (uuid)
	query = """SELECT g.id as group_id,g.group_name,g.sent, p.id as person_id,p.name,p.email,p.active, p.nots from groups g inner join
	people p where g.id = p.group_id and g.admin = (select id from users where uuid = '%s') order by p.group_id;""" % (uuid)
	
	if uuid == 'test':
		query = """SELECT * from groups""" 
	conn = sqlite3.connect('secretsanta.db')
	cursor= conn.cursor()
	cursor.execute(query)
	if cursor == None:
		return None
	rows = [x for x in cursor]
	cols = [x[0] for x in cursor.description]
	raw_data = []

	for row in rows:
		dataSingle = {}
		for prop, val in zip(cols, row):
			dataSingle[prop] = val
		raw_data.append(dataSingle)
	conn.close()
	#print(raw_data)
	#data = structure_group(raw_data)
	print ("getGroups done successfully")
	return raw_data	

def getGroup(g_id):
	#query = """select * from groups where id = %s""" % (g_id)
	query = """SELECT g.id as group_id,g.group_name,g.sent, p.id as person_id,p.name,p.email,p.active,p.nots from groups g inner join
	people p where g.id = p.group_id and g.id = %s""" % (g_id)
	print(query )
	conn = sqlite3.connect('secretsanta.db')
	cursor= conn.cursor()
	cursor.execute(query)
	if cursor == None:
		return None
	rows = [x for x in cursor]
	cols = [x[0] for x in cursor.description]
	conn.close()
	raw_data = []

	for row in rows:
		dataSingle = {}
		for prop, val in zip(cols, row):
			dataSingle[prop] = val
		raw_data.append(dataSingle)
	#data = structure_group(raw_data)

	print ("getGroup done successfully")
	return raw_data


def addGroup(groupName, userInfo):
	if uniqueEntry("""select * from groups where group_name = '%s' and
	admin = (select id from users where uuid = '%s')""" % (groupName, userInfo["uuid"])):
		nowTime = '{:%Y-%m-%d}'.format(datetime.datetime.now())
		query = """insert into groups (group_name,date_created,last_update_date,admin,public,sent)
			values ('%s', '%s', '%s', (select id from users where uuid = '%s'), 0,0);""" % (
				groupName, nowTime,nowTime,userInfo["uuid"]
			)
		print(query)
		conn = sqlite3.connect('secretsanta.db')
		cursor= conn.cursor()
		cursor.execute(query)
		conn.commit()
		new_group_id = cursor.lastrowid
		conn.close()
		add_person({"col":"name", "group_id": new_group_id, "newVal": ""})
		return {"group_id":new_group_id,"group_name":groupName,"success":True,"message":"New Group created"}
	return {"message": "Group creation error","success":False}
	for group in groups:
		if groupName == groups[group]["name"]:
			return False
	return True

def make_update_strings(vars):
	ret_string = ""
	for var in vars:
		print(var)
		ret_string = ret_string + "%s = '%s', " % (var, vars[var]) 
	return ret_string[:-2]


def update_person(vars, creds):
	id = vars.pop("person_id", None)
	update_string = make_update_strings(vars)
	#Should first check that user is valid to make change
	query = """update people set %s where id = %s""" % (
				update_string, id
			)
	try:
		conn = sqlite3.connect('secretsanta.db')
		cursor = conn.cursor()
		cursor.execute(query)
		conn.commit()
		conn.close()
		return True
	except:
		print("Error: Something went wrong")
		return False

def add_person(vars):
	#Should first check that user is valid to make change
	new_name = vars["name"]
	new_email = vars["email"]
	query = """insert into people(group_id, name, email, active) values (%s, '%s', '%s',%s)""" % (
				vars["group_id"], new_name, new_email,1
			)

	print(query)
	conn = sqlite3.connect('secretsanta.db')
	cursor = conn.cursor()
	cursor.execute(query)
	conn.commit()
	conn.close()
	group = getGroup(vars["group_id"])
	return {"success":True,"message":"Person added","updated_g_id": vars["group_id"], "updated_group": group}
