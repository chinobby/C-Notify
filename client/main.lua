local function SendNotification(type, message)
    SendNUIMessage({
        type = 'notification',
        notificationType = type,
        message = message
    })
end

exports('SendNotification', function(type, message)
    SendNotification(type, message)
end)

local function InitializeESX()
    local maxAttempts = 20
    local attempts = 0
    
    while not ESX and attempts < maxAttempts do
        attempts = attempts + 1
        ESX = exports["es_extended"]:getSharedObject()
        if not ESX then Wait(500) end
    end
    
    if not ESX then
        print('^1[C-Notify] Failed to get ESX after ' .. maxAttempts .. ' attempts^7')
        return false
    end
    
    return true
end

CreateThread(function()
    if not InitializeESX() then return end
    
    -- Store original notification function if it exists
    local originalShowNotification = ESX.ShowNotification
    
    ESX.ShowNotification = function(message, type)
        if not message then return end
        
        local notifyType = 'info'
        if type == 'error' then notifyType = 'error'
        elseif type == 'success' then notifyType = 'success'
        elseif type == 'warning' then notifyType = 'warning'
        elseif type == 'custom' then notifyType = 'custom' end
        
        SendNotification(notifyType, message)
        
        -- Call original function if it exists and is different
        if originalShowNotification and originalShowNotification ~= ESX.ShowNotification then
            originalShowNotification(message, type)
        end
    end
    

end)


RegisterCommand('notify', function(source, args, raw)
    local type = args[1] or 'info'
    local message = args[2] or 'Esto es una prueba'
    SendNotification(type, message)
end, false)

-- Ejemplos de uso:
-- /notify warning "This is a warning"
-- /notify error "This is an error"
-- /notify info "This is an info"
-- /notify success "This is a success"
-- /notify custom "This is a custom notification"



RegisterNetEvent('c-notify:sendNotification')
AddEventHandler('c-notify:sendNotification', function(type, message)
    SendNotification(type, message)
end)