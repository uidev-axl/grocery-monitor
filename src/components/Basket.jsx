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
    ShoppingBasket,
    PhilippinePeso
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
    const [items, setItems] = useState([])
    const [newItem, setNewItem] = useState({ name: '', price: 0, quantity: 1 })
    const [editingItem, setEditingItem] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
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
        }
    }, [items, newItem, updateItemsWithHistory])

    const updateItem = useCallback((id, field, value) => {
        updateItemsWithHistory(items.map(item =>
            item.id === id ? { ...item, [field]: field === 'price' || field === 'quantity' ? parseFloat(value) || 0 : value } : item
        ))
    }, [items, updateItemsWithHistory])

    const deleteItem = useCallback((id) => {
        updateItemsWithHistory(items.filter(item => item.id !== id))
        setIsModalOpen(false)
    }, [items, updateItemsWithHistory])

    const saveEditedItem = useCallback(() => {
        if (editingItem) {
            updateItemsWithHistory(items.map(item => item.id === editingItem.id ? editingItem : item))
            setIsModalOpen(false)
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
            {/* Sticky Header */}
            <header className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
                <h1 className="text-lg font-bold text-primary flex items-center"><ShoppingBasket className='mr-2' /> Basket Monitor</h1>
                <div className="space-x-2">
                    <Button variant="outline" size="sm">Login</Button>
                    <Button size="sm">Sign Up</Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col flex-grow p-4 overflow-y-auto">
                {/* Undo/Redo Buttons */}
                <div className="flex justify-end mb-4 space-x-2">
                    <Button variant="outline" size="sm" onClick={undo} disabled={history.length === 0}>
                        <Undo className="h-4 w-4 mr-2" /> Undo
                    </Button>
                    <Button variant="outline" size="sm" onClick={redo} disabled={future.length === 0}>
                        <Redo className="h-4 w-4 mr-2" /> Redo
                    </Button>
                </div>

                {/* Item List */}
                <ul className="space-y-4 mb-4">
                    {items.map(item => (
                        <li
                            key={item.id}
                            className="bg-white p-4 rounded-lg shadow flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
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

                {/* Add New Item Form */}
                <div className="@container bg-white p-4 rounded-lg shadow mb-1 mt-auto">
                    <h2 className="flex items-center text-md font-semibold mb-2">
                        <ShoppingBag className="h-5 mr-2" /> Add New Item
                    </h2>
                    <div className="grid grid-cols-1 @xs:grid-cols-4 @lg:grid-cols-6 gap-2">
                        <Input
                            type="text"
                            placeholder="Item name"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            className='@xs:col-span-full @lg:col-span-2'
                        />
                        <Input
                            type="number"
                            placeholder="Price"
                            value={newItem.price || ''}
                            onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                            className='@xs:col-span-2'
                        />
                        <Input
                            type="number"
                            placeholder="Quantity"
                            value={newItem.quantity}
                            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || '' })}
                            min="1"
                        />
                        <Button onClick={addItem}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add
                        </Button>
                    </div>
                </div>
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
                    <Button variant="outline" onClick={() => updateItemsWithHistory([])}>
                        <Eraser className="h-4 w-4 mr-2" />Clear
                    </Button>
                    <Button><Save className="h-4 w-4 mr-2" />Save</Button>
                </div>
            </footer>

            {/* Edit Item Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle><Pencil className="h-5 w-5 mr-2" />Edit Item</DialogTitle>
                    </DialogHeader>
                    {editingItem && (
                        <div className="space-y-4">
                            <Input
                                type="text"
                                value={editingItem.name}
                                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                            />
                            <Input
                                type="number"
                                value={editingItem.price}
                                onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })}
                            />
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="icon" onClick={() => setEditingItem({ ...editingItem, quantity: Math.max(1, editingItem.quantity - 1) })}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                    type="number"
                                    value={editingItem.quantity}
                                    onChange={(e) => setEditingItem({ ...editingItem, quantity: Math.max(1, parseInt(e.target.value) || 0) })}
                                    className="w-16 text-center"
                                    min="1"
                                />
                                <Button variant="outline" size="icon" onClick={() => setEditingItem({ ...editingItem, quantity: editingItem.quantity + 1 })}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500 flex items-center">
                                Total: <PhilippinePeso className='h-3 w-3 ml-3 mr-0' /> {(editingItem.price * editingItem.quantity).toFixed(2)}
                            </p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => editingItem && deleteItem(editingItem.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />Delete
                        </Button>
                        <Button onClick={saveEditedItem}><Save className="h-4 w-4 mr-2" />Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
