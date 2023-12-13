DROP FUNCTION IF EXISTS check_permissions(userid uuid, resourceid bigint, roles_required text[]);
CREATE FUNCTION check_permissions(userid uuid, resourceid bigint, roles_required text[])
    RETURNS boolean AS $$
        BEGIN
            RETURN EXISTS (
                SELECT 1 FROM permissions as pe
                WHERE pe.user_id = userid
                AND pe.resource_id = resourceid
                AND pe.role = ANY (roles_required)
            ) OR EXISTS (
                SELECT * FROM permissions as p  
                WHERE p.user_id = userid
                AND p.resource_id IN (
                    SELECT id
                    FROM resources
                    WHERE id IN (
                        SELECT CAST(jsonb_array_elements(hierarchy) ->> 'resource_id' AS bigint)
                        FROM resources
                        WHERE id = resourceid
                    )
                )
                AND p.role = ANY (roles_required)
            );
        END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
