<template>
	<div class="DragDrop">
		<div class="DragDrop-DropZone" 
			@drop="onDrop($event, 1)" 
			@dragenter.prevent @dragover.prevent>
			<div class="DragDrop-DragEl" 
			 v-for="item in firstList" :key="item.id"
				draggable="true"
				@click="onClick($event, item, 1)"
				@dragstart="startDrag($event, item, 1)"
				@drop.stop="onDropSort($event, item, 1)"
				@dragover.prevent="onOver($event)"
				@dragleave.prevent="onLeave($event)"
				@dragenter.prevent
			 >
			 {{ item.title }} 
			</div>
		</div>
		<div class="DragDrop-DropZone" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
			<div class="DragDrop-DragEl" 
				:class="styleClass"
				v-for="item in secondList" :key="item.id"
				draggable="true"
				@click="onClick($event, item, 2)"
				@dragstart="startDrag($event, item, 2)"
				@drop.stop="onDropSort($event, item, 2)"
				@dragover.prevent="onOver($event)"
				@dragleave.prevent="onLeave($event)"
				@dragenter.prevent
				>
				{{ item.title }}
			</div>
		</div>
	</div>
</template>

<script setup>
const { firstList, secondList } = defineProps({
	firstList: {
		type: Array,
		required: true
	},
	secondList: {
		type: Array,
		required: true
	},
	styleClass: {
		type: String
	}
})

const startDrag = (event, item, list) => {
	event.dataTransfer.dropEffect = 'move'
	event.dataTransfer.effectAllowed = 'move'
	event.dataTransfer.setData('itemId', item.id)
	event.dataTransfer.setData('itemList', list)
}

const onClick = (event, item, list) => {
	if (list === 1) {
		secondList.push(item);
		let index = firstList.map(i => i.id ).indexOf(item.id);
		firstList.splice(index, 1);
	} else {
		firstList.push(item);
		let index = secondList.map(i => i.id ).indexOf(item.id);
		secondList.splice(index, 1);
	}
} 
const onOver = (event) => event.target.style.border = "1px solid #33a06f"
const onLeave = (event) => event.target.style.border = "1px solid #363636"

const generateId = (arr) => arr.length ? Math.max(...arr.map(item => item.id)) + 1 : 0
const getItemPosition = (arr, itemId) => arr.findIndex((item) => item.id == itemId)

const getItemById = (event, list) => {
	const itemId = +event.dataTransfer.getData('itemId')
	const item = list === 1 ? firstList.find((item) => item.id == itemId) : secondList.find((item) => item.id == itemId)
	return { item, itemId }
}

const moveItem = (from, to, itemPosition, droppedItemPosition, item) => {
	from.splice(itemPosition, 1)
	to.splice(droppedItemPosition, 0, {...item, id: generateId(to)})
}

const changeList = (event, list, droppedItem, listNumber) => {
	const { item, itemId } = listNumber === 1 ? getItemById(event, 1) : getItemById(event)
	const itemPosition = getItemPosition(list, itemId)
	const droppedItemPosition = getItemPosition(list, droppedItem.id)
	list.splice(itemPosition, 1)
	list.splice(droppedItemPosition, 0, item)
}

const onDropSort = (event, droppedItem, list) => {
	onLeave(event)
	const itemList = +event.dataTransfer.getData('itemList')
	const { item, itemId } = getItemById(event, itemList)

	const itemPosition = getItemPosition(itemList === 1 ? firstList : secondList, itemId)
	const droppedItemPosition = getItemPosition(list === 1 ? firstList : secondList, droppedItem.id)

	if (itemList === 1 && list === 2) {
		moveItem(firstList, secondList, itemPosition, droppedItemPosition, item)
		return
	}

	if (itemList === 2 && list === 1) {
		moveItem(secondList, firstList, itemPosition, droppedItemPosition, item)
		return
	}

	if (list === 1) changeList(event, firstList, droppedItem, list) 
	else changeList(event, secondList, droppedItem, list)
}

const mutationArray = (from, to, item, itemId) => {
	const itemPosition = getItemPosition(from, itemId)
	from.splice(itemPosition, 1)
	to.push({ id: generateId(to), title: item.title })
}

const onDrop = (event, list) => {
	const itemList = +event.dataTransfer.getData('itemList')
	const { item, itemId } = getItemById(event, itemList)
	if (itemList === 1 && list === 2) {
		mutationArray(firstList, secondList, item, itemId)
	} else if (itemList === 2 && list === 1) {
		mutationArray(secondList, firstList, item, itemId)
	}
}
</script>

<style lang="scss" scoped>
.DragDrop {
	max-width: 600px;
	padding: 30px;
	display: flex;
	flex-direction: column-reverse;
	justify-content: space-between;
	margin: 0 auto;
	margin-top: 30px auto;
	color: #ffffffde;
	gap: 30px;
	border-radius: 8px;
	@media (max-width: 768px) {
		padding: 0;
		gap: 1rem;
		margin: 0 auto;
		margin-top: 1rem;
	}
	@media (max-width: 400px) {
		flex-direction: column;
	}
}
.DragDrop-DropZone {
	display: flex;
	flex-direction: row;
	border: 1px solid #363636;
	border-radius: 8px;
	min-height: 48px;
	justify-content: left;
	align-items: center;
	gap: 0.2rem;
	h3 {
		font-size: 18px;
		margin-bottom: 15px;
	}
}
.DragDrop-DragEl {
	background-color: #363636;
	border: 1px solid #363636;
	border-radius: 8px;
	cursor: grab;
	width: 11%;
	font-size: 1.8rem;
	line-height: 2.3rem;
	text-transform: uppercase;
	text-align: center;
}

.rightAnswer {
	background-color: rgb(84, 181, 84);
}

.previousAnswer {
	background-color: orange;
}

.wrongAnswer {
	background-color: red;
}
</style>