import mysql.connector
from flask import render_template, Blueprint, request,redirect,flash

assignment10= Blueprint('assignment10', __name__,
                 static_folder='static',
                 static_url_path='/assignment10.py',
                 template_folder='templates')


def interact_db(query, query_type: str):
    return_value = False
    connection = mysql.connector.connect(host ='localhost',
                                         user='root',
                                         passwd='rs052605'
                                         ,database= 'ass10')
    cursor = connection.cursor(named_tuple=True)
    cursor.execute(query)

    if query_type == 'commit':
        connection.commit()
        return_value = True

    if query_type == 'fetch':
        query_result = cursor.fetchall()
        return_value= query_result

    connection.close()
    cursor.close()
    return return_value

@assignment10.route('/assignment10')
def index():
    query3="SELECT * FROM users"
    query_result = interact_db(query=query3, query_type="fetch")
    return render_template('assignment10.html',users=query_result)



@assignment10.route('/insert_user',methods=['POST'])
def insert():
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    query="INSERT INTO users(first_name,last_name, email) VALUES ('%s','%s','%s')" % (first_name, last_name, email)
    interact_db(query=query, query_type="commit")
    flash('user added to DB')
    return redirect('assignment10')

@assignment10.route('/update_user',methods=['POST'])
def update():
    first_name_to_update = request.form['first_name_to_update']
    # last_name_to_update = request.form['last_name_to_update']
    email_to_update = request.form['email_to_update']
    query1 = "UPDATE users SET email= '%s' WHERE first_name = '%s'" % (email_to_update,first_name_to_update)
    interact_db(query=query1, query_type="commit")
    flash('user has been update')
    return redirect('/assignment10')


@assignment10.route('/delete_user',methods=['POST'])
def delete():
    user_id_to_delete = request.form['user_id']
    query2 = "DELETE FROM users WHERE id = '%s';" % user_id_to_delete
    interact_db(query=query2, query_type="commit")
    flash('user has been deleted')
    return redirect('/assignment10')

