import { renderHook } from "@testing-library/react";
import { useState, useEffect } from "react"

describe('Hooks', () => {
    test('Given a simple test When test is done Then should pass', () => {

        const { result } = renderHook(() => {
            const [nome, setNome] = useState('');
            useEffect(() => {
                setNome('Alice')
            }, [])
            return nome
        })
        expect(result.current).toBe('Alice')
    })
})