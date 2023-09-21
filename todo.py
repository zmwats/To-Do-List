from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Initialize an empty tasks list
tasks = []

@app.route('/')
def todo():
    return render_template('todo.html', tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    task = request.form['task']
    if task:
        tasks.append(task)
    return jsonify({'message': 'Task added successfully'})

@app.route('/delete_task/<int:todo>', methods=['POST'])
def delete_task(todo):
    if 0 <= todo < len(tasks):
        del tasks[todo]
        return jsonify({'message': 'Task deleted successfully'})
    return jsonify({'message': 'Invalid task index'}), 400

if __name__ == '__main__':
    app.run(debug=True)



