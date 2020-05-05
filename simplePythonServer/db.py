import sqlite3
import uuid
import datetime
import hashlib


def generate_uuid():
	return uuid.uuid1().hex

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
	#query = """SELECT g.id as group_id,g.group_name,g.sent, p.id as person_id,p.name,p.email,p.active, p.nots from groups g inner join
	#people p where g.id = p.group_id and g.admin_uuid = '%s' order by p.group_id;""" % (uuid)
	query = """SELECT id as group_id,group_name,sent, public, group_url_id from groups 
	where admin_uuid = '%s' order by id;""" % (uuid)
	print(query)
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
	print ("getGroups done successfully")
	print(generate_uuid())
	return raw_data	

def getGroup(g_id):
	query = """SELECT g.id as group_id,g.group_name,g.sent, p.id as person_id,p.name,p.email,p.active,p.nots from groups g inner join
	people p where g.id = p.group_id and g.group_url_id = '%s'""" % (g_id)
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

	print ("getGroup done successfully")
	return raw_data


def addGroup(groupName, userInfo):
	uuid = userInfo["uuid"]
	broken_query = "error"
	if uniqueEntry("""select * from groups where group_name = '%s'""" % (groupName)):
		try:
			nowTime = '{:%Y-%m-%d}'.format(datetime.datetime.now())
			ugid = generate_uuid()
			query = """insert into groups (group_name,date_created,last_update_date,admin_uuid,public,sent,group_url_id)
				values ('%s', '%s', '%s', '%s', 0,0,'%s');""" % (
					groupName,nowTime,nowTime,uuid,ugid
				)
			broken_query =query 
			print(query)
			do_query(query)
			return 200
		except:
			print("Error: add_group")
			print(broken_query)
			return 400
	return 400


def make_update_strings(vars):
	ret_string = ""
	for var in vars:
		print(var)
		ret_string = ret_string + "%s = '%s', " % (var, vars[var]) 
	return ret_string[:-2]


def update_person(vars, creds):
	id = vars.pop("person_id", None)
	vars.pop("uuid", None)
	update_string = make_update_strings(vars)
	if not user_group_rights(None,creds["uuid"],id, False):
		return 301
	
	query = """update people set %s where id = %s""" % (
				update_string, id
			)
	try:
		do_query(query)
		return 200
	except:
		print("Error: update_person")
		print(query)
		return 400

def update_group(vars, creds):
	id = vars.pop("group_id", None)
	vars.pop("uuid", None)
	vars['public'] = vars.pop("public_group")
	update_string = make_update_strings(vars)
	if not user_group_rights(id,creds["uuid"],None, False):
		return 301
	query = """update groups set %s where group_url_id = '%s'""" % (
				update_string, id
			)
	print(query)
	try:
		do_query(query)
		return 200
	except:
		print("Error: update_group")
		print(query)
		return 400

def delete_group(vars, creds):
	if vars["group_id"][0]:
		if not user_group_rights(vars["group_id"][0],creds["uuid"],None, True):
			return 301
		broken_query1 = "error"
		broken_query2 = "error"
		try:
			query1 = """delete from people where group_id =
			(select id from groups where group_url_id = '%s' and admin_uuid = '%s');""" % (
					vars["group_id"][0], creds["uuid"]
				)
			query2 = """delete from groups where group_url_id = '%s' and admin_uuid = '%s';""" % (
					vars["group_id"][0], creds["uuid"]
				)
			broken_query1 = query1
			broken_query2 = query2
			do_query(query1)
			do_query(query2)
			return 200
		except:
			print("Error: delete_group")
			print(broken_query1)
			print(broken_query2)
			return 400
	return 400

def add_person(vars,creds):
	if not user_group_rights(vars["group_id"],creds["uuid"], None,False):
			return 301
	new_name = vars["name"]
	new_email = vars["email"]
	query = """insert into people(group_id, name, email, active) values (
		(select id from groups where group_url_id = '%s')
		, '%s', '%s',%s)""" % (
				vars["group_id"], new_name, new_email,1
			)
	print(query)
	try:
		do_query(query)
		return 200
	except:
		print("Error: Adding person")
		print(query)
		return 400

def delete_person(vars, creds):
	print(vars)
	if not user_group_rights(None,creds["uuid"],vars["id"][0], True):
		return 301
	if vars["id"][0]:
		try:
			query = """delete from people where id = %s""" % (
						vars["id"][0]
					)
			do_query(query)
			return 200
		except:
			return 400
	return 400


#Check if the current user has the rights for the action selected.
#Strict false means that if the group is public allow this right (does not apply to delete) 
def user_group_rights(gid, uid, pid,strict=True):
	try:
		query = None
		if gid:
			if strict:
				query = """select * from groups where group_url_id = '%s' and admin_uuid = '%s';""" % (
					gid, uid
				)
			else:
				query = """select * from groups where group_url_id = '%s' and (admin_uuid = '%s' or public=1);""" % (
					gid,uid
				)
		elif pid:
			if strict:
				query = """select * from groups where id = 
				(select group_id from people where id =%s) 
				and admin_uuid ='%s';""" % (
					pid, uid
				)
			else:
				query = """select * from groups where id = 
				(select group_id from people where id =%s) 
				and (admin_uuid ='%s' or public=1);""" % (
					pid, uid
				)
		if query == None:
			return False
		conn = sqlite3.connect('secretsanta.db')
		cursor= conn.cursor()
		cursor.execute(query)
		if cursor == None:
			return None
		rows = cursor.fetchall()
		conn.close()
		if len(rows) > 0:
			return True
		return False
	except:
		return False


def do_query(q):
	conn = sqlite3.connect('secretsanta.db')
	cursor = conn.cursor()
	cursor.execute(q)
	conn.commit()
	conn.close()