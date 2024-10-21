'use client'

import { useState, useCallback } from 'react'
import {
    Plus,
    Minus,
    Undo,
    Redo,
    Eraser,
    Save,
    Pencil,
    Trash2,
    ShoppingBag,
    PhilippinePeso,
    X
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

export default function GroceryMonitor() {

    /**
     * TODO: Set the following localStorage
     * 1. basketHistory
     * 1. basketFuture
     * 2. basketState
     */

    const [items, setItems] = useState([])
    const [newItem, setNewItem] = useState({ name: '', price: 0, quantity: 1 })
    const [editingItem, setEditingItem] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isClearModalOpen, setIsClearModalOpen] = useState(false)
    const [history, setHistory] = useState([])
    const [future, setFuture] = useState([])

    const updateItemsWithHistory = useCallback((newItems) => {
        setHistory(prev => [...prev, items])
        setItems(newItems)
        setFuture([])
    }, [items])

    const addItem = useCallback(() => {
        if (newItem.name && newItem.price > 0 && newItem.quantity > 0) {
            updateItemsWithHistory([...items, { ...newItem, id: Date.now() }])
            setNewItem({ name: '', price: 0, quantity: 1 })
            setIsAddModalOpen(false);
        }
    }, [items, newItem, updateItemsWithHistory])

    const updateItem = useCallback((id, field, value) => {
        updateItemsWithHistory(items.map(item =>
            item.id === id ? { ...item, [field]: field === 'price' || field === 'quantity' ? parseFloat(value) || 0 : value } : item
        ))
    }, [items, updateItemsWithHistory])

    const deleteItem = useCallback((id) => {
        updateItemsWithHistory(items.filter(item => item.id !== id))
        setIsEditModalOpen(false)
    }, [items, updateItemsWithHistory])

    const saveEditedItem = useCallback(() => {
        if (editingItem) {
            updateItemsWithHistory(items.map(item => item.id === editingItem.id ? editingItem : item))
            setIsEditModalOpen(false)
        }
    }, [editingItem, items, updateItemsWithHistory])

    const undo = useCallback(() => {
        if (history.length > 0) {
            const prevItems = history[history.length - 1]
            setFuture(prev => [items, ...prev])
            setItems(prevItems)
            setHistory(prev => prev.slice(0, -1))
        }
    }, [history, items])

    const redo = useCallback(() => {
        if (future.length > 0) {
            const nextItems = future[0]
            setHistory(prev => [...prev, items])
            setItems(nextItems)
            setFuture(prev => prev.slice(1))
        }
    }, [future, items])

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Main Content */}
            <main className="flex flex-col flex-grow p-4 overflow-y-auto relative">
                {/* Quick Action Buttons */}
                <div className="flex flex-row justify-end mb-4 gap-x-2 fixed bottom-16 right-4">
                    <Button className='w-10 h-10 rounded-full' variant="outline" size="sm" onClick={undo} disabled={history.length === 0}>
                        <Undo className="h-3 w-3" />
                    </Button>
                    <Button className='w-10 h-10 rounded-full' variant="outline" size="sm" onClick={redo} disabled={future.length === 0}>
                        <Redo className="h-3 w-3" />
                    </Button>
                    <Button className='w-10 h-10 rounded-full' size="sm" onClick={() => setIsAddModalOpen(true)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                {/* Item List */}
                <ul className="space-y-4 mb-12">
                    {items.map(item => (
                        <li
                            key={item.id}
                            className="bg-white p-4 rounded-lg shadow flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => { setEditingItem(item); setIsEditModalOpen(true); }}
                        >
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-xs text-gray-500 flex items-center"><PhilippinePeso className='h-3 w-3 mr-1' /> {item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <p className="text-md font-semibold mr-4 flex items-center">
                                    <PhilippinePeso className='h-4 w-4 mr-1' /> {(item.price * item.quantity).toFixed(2)}
                                </p>

                                <div className='flex items-center' onClick={(e) => e.stopPropagation()}>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateItem(item.id, 'quantity', Math.max(1, item.quantity - 1))}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateItem(item.id, 'quantity', item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>

            {/* Sticky Footer */}
            <footer className="sticky bottom-0 bg-white shadow-md p-4 flex justify-between items-center">
                <div className="text-lg font-semibold flex flex-col justify-start items-start">
                    <small className='text-[10px] uppercase font-semibold leading-none'>Total</small>
                    <span className='text-xl flex items-center'>
                        <PhilippinePeso className='h-5 w-5 mr-1' /> {totalPrice.toFixed(2)}
                    </span>
                </div>
                <div className="space-x-2">
                    <Button variant="outline" onClick={() => setIsClearModalOpen(true)} disabled={items.length < 1} >
                        <Eraser className="h-4 w-4 mr-2" />Clear
                    </Button>
                    <Button>
                        <Save className="h-4 w-4 mr-2" />Save
                    </Button>
                </div>
            </footer>

            {/* Add New Item Form */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle><ShoppingBag className="h-5 mr-2" /> Add New Item</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 @xs:grid-cols-4 @lg:grid-cols-6 gap-2">
                        <div className='@xs:col-span-full @lg:col-span-2'>
                            <label htmlFor="" className='text-[10px] uppercase font-bold ml-[2px] mb-2 inline-block'>Item Name</label>
                            <Input
                                type="text"
                                placeholder="Item name"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                className='w-full'
                            />
                        </div>
                        <div className='@xs:col-span-2'>
                            <label htmlFor="" className='text-[10px] uppercase font-bold ml-[2px] mb-2 inline-block'>Price</label>
                            <Input
                                type="number"
                                placeholder="Price"
                                value={newItem.price || ''}
                                onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                                className='w-full'
                            />
                        </div>

                        <div className='@xs:col-span-2'>
                            <label htmlFor="" className='text-[10px] uppercase font-bold ml-[2px] mb-2 inline-block'>QTY</label>
                            <Input
                                type="number"
                                placeholder="Quantity"
                                value={newItem.quantity}
                                onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || '' })}
                                className='w-full'
                                min="1"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <div className='grid grid-cols-2 gap-x-2'>
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                                <X className="h-4 w-4 mr-2" /> Cancel
                            </Button>
                            <Button onClick={addItem}>
                                <Plus className="h-4 w-4 mr-2" /> Add
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Item Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle><Pencil className="h-5 w-5 mr-2" />Edit Item</DialogTitle>
                    </DialogHeader>

                    {editingItem && (
                        <div className="grid @xs:grid-cols-4 gap-y-3">
                            <div className="col-span-full">
                                <label htmlFor="" className='text-[10px] uppercase font-bold ml-[2px] mb-2 inline-block'>Item Name</label>
                                <Input
                                    type="text"
                                    value={editingItem.name}
                                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                />
                            </div>
                            <div className='col-span-full grid @xs:grid-cols-2 gap-x-3'>
                                <div className="">
                                    <label htmlFor="" className='text-[10px] uppercase font-bold ml-[2px] mb-2 inline-block'>Price</label>
                                    <Input
                                        type="number"
                                        value={editingItem.price}
                                        onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="" className='text-[10px] uppercase font-bold ml-[2px] mb-2 inline-block'>QTY</label>
                                    <div className="flex items-center gap-x-1">
                                        <Button variant="outline" size="icon" onClick={() => setEditingItem({ ...editingItem, quantity: Math.max(1, editingItem.quantity - 1) })}>
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            type="number"
                                            value={editingItem.quantity}
                                            onChange={(e) => setEditingItem({ ...editingItem, quantity: Math.max(1, parseInt(e.target.value) || 0) })}
                                            className="flex-grow w-16 text-center"
                                            min="1"
                                        />
                                        <Button variant="outline" size="icon" onClick={() => setEditingItem({ ...editingItem, quantity: editingItem.quantity + 1 })}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="text-md flex flex-row items-center justify-between mt-2"> */}
                            <div className="col-span-full flex items-center justify-between">
                                <span className='text-[10px] uppercase font-bold ml-[2px]'>Total:</span>
                                <div className='flex items-center font-bold text-xl'>
                                    <PhilippinePeso className='h-4 w-4 mr-1' strokeWidth={2.5} /> {(editingItem.price * editingItem.quantity).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <div className='grid grid-cols-2 gap-x-2'>
                            <Button variant="outline" onClick={() => editingItem && deleteItem(editingItem.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />Delete
                            </Button>
                            <Button onClick={saveEditedItem}><Save className="h-4 w-4 mr-2" />Save</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Clear All Modal */}
            <Dialog open={isClearModalOpen} onOpenChange={setIsClearModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle><Eraser className="h-5 w-5 mr-2" />Clear All Items</DialogTitle>
                    </DialogHeader>

                    Are you sure you want to clear all items? You can revert this action by tapping the undo button.

                    <DialogFooter>
                        <div className='grid @xs:grid-cols-2 gap-x-2 gap-y-2'>
                            <Button variant="outline" onClick={() => setIsClearModalOpen(false)}>
                                <X className="h-4 w-4 mr-2" />Cancel
                            </Button>
                            <Button variant="destructive" onClick={() => { updateItemsWithHistory([]); setIsClearModalOpen(false); }}>
                                <Eraser className="h-4 w-4 mr-2" />Clear
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
