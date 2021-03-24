$(document).ready(() => {
	listTasks('todo');
	listTasks('complete');
});

function addTask() {
	var data = getData('todo');
	var task = $('#new-task').val();
	if (task != "") {
		data.push(task);
		localStorage.setItem('todo', JSON.stringify(data));
		$('#new-task').val("").html("");
		listTasks('todo');
	}
}

function deleteTask(task_number, type) {
	var data = getData(type);
	data.splice(task_number, 1);
	localStorage.setItem(type, JSON.stringify(data));
	var selector;
	if (type == "todo") {
		selector = '#incomplete-tasks';
	} else if (type == "complete") {
		selector = '#completed-tasks'
	}
	$(selector).html("");
	listTasks(type);
}

function swapTask(task_number, src, dest) {
	var data = getData(src);
	var task = data.splice(task_number, 1);
	localStorage.setItem(src, JSON.stringify(data));
	listTasks(src);

	data = getData(dest);
	data.push(task);
	localStorage.setItem(dest, JSON.stringify(data));
	listTasks(dest);
}

function addData(type, toAdd) {
	var data = getData(type);
	if (toAdd != "") {
		data.push(toAdd);
		localStorage.setItem(type, JSON.stringify(data));
		listTasks(type);
	}
}

function getData(type){
	var data = new Array;
	var data_str = localStorage.getItem(type);
	if (data_str != null){
		data = JSON.parse(data_str);
	}
	return data;
}

function listTasks(type) {
	var selector;
	if (type == "todo") {
		selector = '#incomplete-tasks';
	} else if (type == "complete") {
		selector = '#completed-tasks'
	}
	var data = getData(type);
	var html = "";
	data.forEach((task, i) => {
		html += `<li class="list-group-item"><span>${task}</span><div class="btn-group" style="float:right">`
		html += `<button class="btn btn-sm btn-danger" type="button" onclick="deleteTask('${i}', '${type}')">Delete</button>`;
		if (type == "todo") {
			html += `<button class="btn btn-sm btn-success" type="button" onclick="swapTask('${i}', 'todo', 'complete')">Mark as Complete</button>`;
		} else if (type == "complete") {
			html += `<button class="btn btn-sm btn-success" type="button" onclick="swapTask('${i}', 'complete', 'todo')">Mark as Incomplete</button>`;
		}
		html += `</div></li>`;
	});
	$(selector).html(html);
}
